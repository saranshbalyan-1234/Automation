const express = require("express");
const { createDriver } = require("./Utils/driver");
const { getTestStepByTestCase } = require("./Controllers/testCaseController");
const { handleStep } = require("./Utils/actionEvent");
const { validateToken } = require("./Utils/Middlewares/jwt");
const {
  createProcessHistory,
  createStepHistory,
} = require("./Controllers/executionHistoryController");
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

    let output = {};
    for (const process of data.data) {
      const processHistory = await createProcessHistory(
        req,
        process,
        data.executionHistory
      );
      for (const step of process.testSteps) {
        let tempParameter = {};
        step.testParameters.forEach((parameter) => {
          if (parameter.method == "Static") {
            tempParameter[parameter.type] = parameter.property;
          } else if (parameter.method == "Dynamic") {
            tempParameter[parameter.type] = output[parameter.property];
          }
        });

        let tempStep = { ...step.dataValues, testParameters: tempParameter };

        const stepHistory = await createStepHistory(
          req,
          tempStep,
          data.executionHistory,
          processHistory
        );
        await handleStep(tempStep, driver, output, req, stepHistory);
      }
    }
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
