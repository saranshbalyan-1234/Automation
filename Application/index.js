const express = require("express");
const { createDriver } = require("./Utils/driver");
const { getTestStepByTestCase } = require("./Controllers/testCaseController");
const { handleStep } = require("./Utils/actionEvent");
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

app.get("/execute/:testCaseId", async (req, res) => {
  let driver = await createDriver(req, res);
  try {
    const data = await getTestStepByTestCase(req, res);
    res.status(200).json({ message: "Started Execution" });
    let output = {};
    for (const process of data) {
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
        await handleStep(tempStep, driver, output);
      }
    }
  } catch (err) {
    console.log(err);
  }
  // finally {
  //   await driver.quit();
  // }
});

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(3002, () => {
  console.log("You can execute now!");
});
