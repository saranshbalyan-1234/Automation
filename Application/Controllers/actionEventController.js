const moment = require("moment");
const { takeScreenshot } = require("../Service/utils");
const { createFolder } = require("./awsController");
const {
  createProcessHistory,
  createStepHistory,
  updateProcessResult,
  updateStepResult,
  updateExecutionResult,
  createExecutionHistory,
} = require("./executionHistoryController");

const { getAllEnvironmentsByTestCase } = require("./environment");
const { createDriver } = require("../Utils/driver");
const { getTestStepByTestCase } = require("./testCaseController");
const { handleStep } = require("../Service");

const execute = async (req, res) => {
  res.status(200).json({ message: "Started Execution" });
  const data = await getTestStepByTestCase(req, res);
  try {
    for (let i = 0; i < req.body.bots; i++) {
      startExecution(req, res, data);
    }
  } catch (err) {
    console.log(err);
  }
};

const startExecution = async (req, res, temp) => {
  const executionHistory = await createExecutionHistory(req, res);
  let data = { executionHistory, data: temp };
  let driver = await createDriver(req, res);
  let canCreateS3Folder = true;
  let output = {};
  let environment = await getAllEnvironmentsByTestCase(req, res);
  let executionResult = { result: true };
  for (let i = 0; i < data.data.length; i++) {
    let process = data.data[i];
    let processResult = { result: true };
    let stepExtra = {
      conditional: false,
      conditionalType: "",
      conditionalResult: false,
      forLoopInitialValue: null,
      break: false,
      skip: false,
      initial: null,
      final: null,
      counter: null,
      current: null,
    };
    const processHistory = await createProcessHistory(
      req,
      process,
      data.executionHistory
    );
    for (let j = 0; j < process.testSteps.length; j++) {
      let step = process.testSteps[j];

      let tempParameter = {};

      step.testParameters.forEach((parameter) => {
        if (parameter.method == "Static") {
          tempParameter[parameter.type] = parameter.property;
        } else if (parameter.method == "Dynamic") {
          tempParameter[parameter.type] = output[parameter.property];
        } else if (parameter.method == "Environment") {
          tempParameter[parameter.type] = environment[parameter.property];
        }
      });

      let tempStep = { ...step.dataValues, testParameters: tempParameter };
      let stepHistory = { dataValues: {} };
      if (tempStep.actionEvent !== "End For Loop") {
        stepHistory = await createStepHistory(
          req,
          tempStep,
          data.executionHistory,
          processHistory
        );
      } else if (
        stepExtra.final === stepExtra.current &&
        tempStep.actionEvent == "End For Loop"
      ) {
        console.log("For Loop Finished");
        stepHistory = await createStepHistory(
          req,
          tempStep,
          data.executionHistory,
          processHistory
        );
      }

      let ifElseConditionCheck =
        stepExtra.conditional == false ||
        tempStep.actionEvent == "End Condition" ||
        (stepExtra.conditional == true &&
          stepExtra.conditionalType == "if" &&
          stepExtra.conditionalResult == true) ||
        (stepExtra.conditional == true &&
          stepExtra.conditionalType == "else" &&
          stepExtra.conditionalResult == false) ||
        (stepExtra.conditional == true &&
          stepExtra.conditionalType == "Else If" &&
          stepExtra.conditionalResult == false);

      if (tempStep.actionEvent == "For Loop") {
        console.log("For Loop Started");
        stepExtra.initial = Number(tempStep.testParameters.Initial);
        stepExtra.current = Number(tempStep.testParameters.Initial);
        stepExtra.final = Number(tempStep.testParameters.Final);
        stepExtra.counter = Number(tempStep.testParameters.Counter);
        stepExtra.forLoopInitialValue = j;
        await updateStepResult(
          req,
          stepHistory.dataValues.id,
          true,
          null,
          tempStep
        );
      }
      if (tempStep.actionEvent == "End For Loop") {
        stepExtra.current = stepExtra.current + stepExtra.counter;
        if (stepExtra.break == false || stepExtra.skip) {
          if (stepExtra.final >= stepExtra.current) {
            j = stepExtra.forLoopInitialValue;
          }
          if (stepExtra.skip) {
            stepExtra.skip = false;
          }
        } else {
          stepExtra.break = false;
        }
        await updateStepResult(
          req,
          stepHistory.dataValues.id,
          true,
          null,
          tempStep
        );
      }
      if (tempStep.actionEvent == "Break For Loop") {
        console.log("For Loop Break");
        stepExtra.break = true;
        await updateStepResult(
          req,
          stepHistory.dataValues.id,
          true,
          null,
          tempStep
        );
      }
      if (tempStep.actionEvent == "Skip For Loop Iteration") {
        console.log("Skipped For Loop Iteration");
        stepExtra.skip = true;
        await updateStepResult(
          req,
          stepHistory.dataValues.id,
          true,
          null,
          tempStep
        );
      }
      if (
        ifElseConditionCheck &&
        stepExtra.break == false &&
        stepExtra.skip == false
      ) {
        const continueOnError = await handleStep(
          tempStep,
          driver,
          output,
          req,
          stepHistory.dataValues.id,
          processResult,
          data.executionHistory,
          stepExtra,
          j
        );
        if (tempStep.screenshot || data.executionHistory.recordAllSteps) {
          await createFolder(req.database, data.executionHistory.id);
          canCreateS3Folder = false;
          await takeScreenshot(driver, req, tempStep, data.executionHistory.id);
        }

        if (continueOnError === "STOP") {
          console.log("Execution Stopped");
          await updateProcessResult(req, processHistory.dataValues.id, false);
          await updateExecutionResult(
            req,
            data.executionHistory.id,
            moment(),
            false
          );
          return;
        }
      } else {
        await updateStepResult(req, stepHistory.dataValues.id, null);
      }
    }
    await updateProcessResult(
      req,
      processHistory.dataValues.id,
      processResult.result
    );
    if (!processResult.result) {
      executionResult.result = false;
    }
  }

  await updateExecutionResult(
    req,
    data.executionHistory.id,
    moment(),
    executionResult.result
  );
  console.log("Execution Finished");
};
module.exports = { execute };
