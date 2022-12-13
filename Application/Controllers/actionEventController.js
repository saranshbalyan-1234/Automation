const moment = require("moment");
const { takeScreenshot } = require("../Utils/ActionEvent/utils");
const { createFolder } = require("./awsController");
const {
  createProcessHistory,
  createStepHistory,
  updateProcessResult,
  updateStepResult,
  updateExecutionResult,
} = require("./executionHistoryController");
const { getAllEnvironmentsByTestCase } = require("./environment");
const { createDriver } = require("../Utils/driver");
const { getTestStepByTestCase } = require("./testCaseController");
const { handleStep } = require("../Utils/actionEvent");

const execute = async (req, res) => {
  let driver = await createDriver(req, res);
  try {
    const data = await getTestStepByTestCase(req, res);
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

        const stepHistory = await createStepHistory(
          req,
          tempStep,
          data.executionHistory,
          processHistory
        );
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
          stepExtra.initial = Number(tempStep.testParameters.Initial);
          stepExtra.current = Number(tempStep.testParameters.Initial);
          stepExtra.final = Number(tempStep.testParameters.Final);
          stepExtra.counter = Number(tempStep.testParameters.Counter);
          stepExtra.forLoopInitialValue = j;
          await updateStepResult(req, stepHistory.dataValues.id, true);
        }
        if (tempStep.actionEvent == "End For Loop") {
          stepExtra.current = stepExtra.current + stepExtra.counter;
          if (stepExtra.break == false) {
            if (stepExtra.final >= stepExtra.current) {
              j = stepExtra.forLoopInitialValue;
            }
          } else {
            stepExtra.break = false;
          }
          await updateStepResult(req, stepHistory.dataValues.id, true);
        }
        if (tempStep.actionEvent == "Break For Loop") {
          stepExtra.break = true;
          await updateStepResult(req, stepHistory.dataValues.id, true);
        }
        if (ifElseConditionCheck && stepExtra.break == false) {
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
            await takeScreenshot(
              driver,
              req,
              tempStep,
              data.executionHistory.id
            );
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
  } catch (err) {
    console.log(err);
  }
};
module.exports = { execute };
