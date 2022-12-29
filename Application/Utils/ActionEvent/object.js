const { findByLocator, handleActionEventError } = require("./utils");
const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");
const collectObjectText = async (
  step,
  driver,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Collecting Object Text");
  try {
    const text = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getText();
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
const collectObjectCSSProperty = async (
  step,
  driver,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Collecting Object CSS Property");
  try {
    const attribute = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getCssValue(step.testParameters.Attribute);
    output[step.testParameters.Output] = attribute;
    console.log(attribute);

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
const collectObjectProperty = async (
  step,
  driver,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Collecting Object Property");
  try {
    const attribute = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getAttribute(step.testParameters.Attribute);
    output[step.testParameters.Output] = attribute;
    console.log(attribute);
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

const scrollToObject = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Scrolling To Object");
  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.executeScript("arguments[0].scrollIntoView()", element);
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
  collectObjectText,
  collectObjectCSSProperty,
  collectObjectProperty,
  scrollToObject,
};
