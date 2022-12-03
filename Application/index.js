const express = require("express");
const { createDriver } = require("./Utils/driver");
const { getTestStepByTestCase } = require("./Controllers/testCaseController");
const { handleStep } = require("./Utils/actionEvent");
const { validateToken } = require("./Utils/Middlewares/jwt");
const {
  createProcessHistory,
  createStepHistory,
  updateProcessResult,
  updateExecutionFinishTime,
  updateStepResult,
} = require("./Controllers/executionHistoryController");
const { getAllEnvironmentsByTestCase } = require("./Controllers/environment");
const moment = require("moment");
const helmet = require("helmet");
const cors = require("cors");
const parser = require("body-parser");
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(validateToken());

app.post("/execute/:testCaseId", async (req, res) => {
  let driver = await createDriver(req, res);
  try {
    const data = await getTestStepByTestCase(req, res);
    let canCreateS3Folder = true;
    let output = {};
    let environment = await getAllEnvironmentsByTestCase(req, res);

    for (let i = 0; i < data.data.length; i++) {
      let process = data.data[i];
      let processResult = { result: true };
      let stepExtra = {
        conditional: false,
        conditionalType: "",
        conditionalResult: false,
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
          step.dataValues,
          data.executionHistory,
          processHistory
        );
        // console.log(stepExtra.conditionalResult, stepExtra.conditional);
        if (
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
            stepExtra.conditionalResult == false)
        ) {
          await handleStep(
            tempStep,
            driver,
            output,
            req,
            stepHistory.dataValues.id,
            processResult,
            data.executionHistory,
            canCreateS3Folder,
            stepExtra
          );
        } else {
          await updateStepResult(req, stepHistory.dataValues.id, null);
        }
      }

      if (processResult.result) {
        await updateProcessResult(req, processHistory.dataValues.id, true);
      }
    }
    await updateExecutionFinishTime(req, data.executionHistory.id, moment());
    console.log("Execution Finished");
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(3002, () => {
  console.log("You can execute now!");
});
