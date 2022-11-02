const express = require("express");
const { createDriver } = require("./Utils/driver");
const { getTestStepByTestCase } = require("./Controllers/testCaseController");
const { handleStep } = require("./Utils/actionEvent");
const app = express();

app.get("/execute/:testCaseId", async (req, res) => {
  let driver = await createDriver(req, res);
  try {
    const data = await getTestStepByTestCase(req, res);
    res.status(200).json({ message: "Started Execution" });

    for (const process of data) {
      for (const step of process.testSteps) {
        let tempParameter = {};
        step.testParameters.forEach((parameter) => {
          tempParameter[parameter.type] = parameter.property;
        });
        let tempStep = { ...step.dataValues, testParameters: tempParameter };
        await handleStep(tempStep, driver);
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
