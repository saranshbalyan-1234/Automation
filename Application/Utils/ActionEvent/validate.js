const chromeDriver = require("selenium-webdriver");
const { until } = chromeDriver;
const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");

const validateObjectTextIncludes = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Validating Object Text Includes");
  try {
    const value = step.testParameters.Value;
    const text = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getText();

    const result = text.includes(value);
    if (result) return await updateStepResult(req, stepHistoryId, true);
    else return await updateStepResult(req, stepHistoryId, false);
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

const validateObjectTextNotIncludes = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Validating Object Text Not Includes");
  try {
    const value = step.testParameters.Value;
    const text = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getText();

    const result = text.includes(value);
    if (result) return await updateStepResult(req, stepHistoryId, false);
    else return await updateStepResult(req, stepHistoryId, true);
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

const validateObjectTextEquals = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Validating Object Text Equals");
  try {
    const value = step.testParameters.Value;
    const text = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getText();

    const result = text === value;
    if (result) return await updateStepResult(req, stepHistoryId, true);
    else return await updateStepResult(req, stepHistoryId, false);
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
  validateObjectTextIncludes,
  validateObjectTextNotIncludes,
  validateObjectTextEquals,
};
