const chromeDriver = require("selenium-webdriver");
const { until } = chromeDriver;
const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");
//totalActionEvents = 21

const { findByLocator, handleActionEventError } = require("./utils");
const implicitWait = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  try {
    const time = Number(step.testParameters.Time);
    console.log("Waiting for " + time + " ms");
    await driver.sleep(time);
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

const waitUntilObjectLocated = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //locator
    await driver.wait(
      until.elementLocated(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );
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
const waitUntilObjectsLocated = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //locator
    await driver.wait(
      until.elementsLocated(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );

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

const waitUntilObjectEnabled = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.elementIsEnabled(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );

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
const waitUntilObjectDisabled = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.elementIsDisabled(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );

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

const waitUntilObjectNotSelected = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.elementIsNotSelected(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );

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

const waitUntilObjectSelected = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.elementIsSelected(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );

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

const waitUntilObjectNotVisible = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.elementIsNotVisible(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );

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

const waitUntilObjectVisible = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  //element
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(
      until.elementIsVisible(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );

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
const waitUntilObjectTextContains = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const string = step.testParameters.string;
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.elementTextContains(
        await findByLocator(step.object.dataValues.locators),
        string
      ),
      timeout
    );

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
const waitUntilObjectTextIs = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.string;
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.elementTextIs(
        await findByLocator(step.object.dataValues.locators),
        string
      ),
      timeout
    );

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
const waitUntilObjectTextMatches = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.elementTextMatches(
        await findByLocator(step.object.dataValues.locators),
        RegEx
      ),
      timeout
    );

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
const waitUntilObjectStalenessOf = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.stalenessOf(await findByLocator(step.object.dataValues.locators)),
      timeout
    );
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
const waitUntilTitleContains = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(until.titleContains(string), timeout);

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
const waitUntilTitleIs = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(until.titleIs(string), timeout);

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
const waitUntilTitleMatches = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(until.titleMatches(RegEx), timeout);

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

const waitUntilUrlContains = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(until.urlContains(string), timeout);

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
const waitUntilUrlIs = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(until.urlIs(string), timeout);
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
const waitUntilUrlMatches = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(until.urlMatches(RegEx), timeout);

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

const waitUntilAbleToSwitchToFrame = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    //element
    await driver.wait(
      until.ableToSwitchToFrame(
        await findByLocator(step.object.dataValues.locators)
      ),
      timeout
    );

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
  implicitWait,
  waitUntilObjectLocated,
  waitUntilObjectsLocated,
  waitUntilObjectEnabled,
  waitUntilObjectDisabled,
  waitUntilObjectNotSelected,
  waitUntilObjectSelected,
  waitUntilObjectNotVisible,
  waitUntilObjectVisible,
  waitUntilObjectTextContains,
  waitUntilObjectTextIs,
  waitUntilObjectTextMatches,
  waitUntilObjectStalenessOf,
  waitUntilTitleContains,
  waitUntilTitleIs,
  waitUntilTitleMatches,
  waitUntilUrlContains,
  waitUntilUrlIs,
  waitUntilUrlMatches,
  waitUntilAbleToSwitchToFrame,
};
