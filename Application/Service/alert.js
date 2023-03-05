const { handleActionEventError } = require("./utils");
const {
  updateStepResult,
} = require("../Controllers/executionHistoryController");
const waitUntilAlertPresent = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const temp = Number(step.testParameters.Timeout);
  const timeout = temp > 1000 ? temp : 1000;
  console.log("Waiting for " + timeout + " ms");
  for (var i = 0; i < timeout; i = i + 1000) {
    try {
      await driver.wait(async () => {
        return await driver.switchTo().alert();
      });
      return await updateStepResult(req, stepHistoryId, true);
    } catch (err) {
      return await handleActionEventError(
        err,
        req,
        stepHistoryId,
        processResult,
        executionHistory.continueOnError
      );
    }
  }
  console.log("Alter Not Found");
};

const acceptAlert = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    await driver.switchTo().alert().accept();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const dismissAlert = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    await driver.switchTo().alert().dismiss();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const getAlertMessage = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory,
  output
) => {
  try {
    const text = await driver.switchTo().alert().getText();
    output[step.testParameters.Output] = text;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const enterTextInAlert = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory,
  output
) => {
  try {
    const text = output[step.testParameters.Text];
    await driver.switchTo().alert().sendKeys(text);

    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

module.exports = {
  waitUntilAlertPresent,
  acceptAlert,
  dismissAlert,
  enterTextInAlert,
  getAlertMessage,
};
