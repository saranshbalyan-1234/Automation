const chromeDriver = require("selenium-webdriver");
const { findByLocator, handleActionEventError } = require("./utils");
const { By } = chromeDriver;
const {
  updateStepResult,
} = require("../Controllers/executionHistoryController");
const click = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Clicking");
  try {
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .click();
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
const doubleClick = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Double Clicking");
  try {
    await driver
      .actions()
      .doubleClick(
        await driver.findElement(
          await findByLocator(step.object.dataValues.locators)
        )
      )
      .perform();
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

const rightClick = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Right Clicking");
  try {
    await driver
      .actions()
      .contextClick(
        await driver.findElement(
          await findByLocator(step.object.dataValues.locators)
        )
      )
      .perform();
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

const clickByJs = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Clicking By Javascript");
  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.executeScript("arguments[0].click();", element);
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

const clickLinkByText = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log(`Clicking Link By Text ${step.testParameters.Text}`);
  try {
    await driver.findElement(By.linkText(step.testParameters.Text)).click();
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
const clickLinkByPartialText = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Clicking Link By Partial Text");
  try {
    await driver
      .findElement(By.partialLinkText(step.testParameters.Text))
      .click();
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

const clickElementByProperty = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Clicking Element By Property & Text");
  try {
    const element = step.testParameters.Element;
    const text = step.testParameters.Text;
    const property =
      step.testParameters.Property != "."
        ? `@${step.testParameters.Property}`
        : ".";
    await driver
      .findElement(
        await findByLocator([
          {
            dataValues: {
              type: "XPATH",
              locator: `//${element}[contains(${property},'${text}')]`,
            },
          },
        ])
      )
      .click();
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
  click,
  doubleClick,
  rightClick,
  clickByJs,
  clickLinkByText,
  clickLinkByPartialText,
  clickElementByProperty,
};
