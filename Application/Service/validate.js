const chromeDriver = require("selenium-webdriver");
const { until } = chromeDriver;
const {
  updateStepResult,
} = require("../Controllers/executionHistoryController");
const { findByLocator, handleActionEventError } = require("./utils");
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
    else throw new Error("Unable to find text in object text!");
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
    if (result) throw new Error("Text found in object text!");
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
    else throw new Error("Text not eqauls to object text!");
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

const validateObjectEnabled = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Validating Object Enabled");
  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.wait(until.elementIsEnabled(element), 1);

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

const validateObjectSelected = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Validating Object Selected");
  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.wait(until.elementIsSelected(element), 1);

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
  validateObjectTextIncludes,
  validateObjectTextNotIncludes,
  validateObjectTextEquals,
  validateObjectEnabled,
  validateObjectSelected,
};
