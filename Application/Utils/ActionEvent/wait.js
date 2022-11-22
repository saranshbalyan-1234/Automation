const chromeDriver = require("selenium-webdriver");
const { until } = chromeDriver;
const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");
//totalActionEvents = 21

const { findByLocator } = require("./utils");
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
    console.log(err);
    if (processResult) processResult = false;
  }
};

const waitUntilObjectLocated = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementLocated(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilObjectsLocated = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementsLocated(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const waitUntilObjectEnabled = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementIsEnabled(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilObjectDisabled = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementIsDisabled(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const waitUntilObjectNotSelected = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementIsNotSelected(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const waitUntilObjectSelected = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementIsSelected(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const waitUntilObjectNotVisible = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementIsNotVisible(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const waitUntilObjectVisible = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementIsVisible(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilObjectTextContains = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const string = step.testParameters.string;
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementTextContains(string, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilObjectTextIs = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.string;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementTextIs(string, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilObjectTextMatches = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.elementTextMatches(RegEx, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilObjectStalenessOf = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.stalenessOf(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilTitleContains = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.titleContains(string, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilTitleIs = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.titleIs(string, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilTitleMatches = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.titleMatches(RegEx, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const waitUntilUrlContains = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.urlContains(string, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilUrlIs = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.urlIs(string, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilUrlMatches = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.urlMatches(RegEx, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const waitUntilAlertPresent = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  const temp = Number(step.testParameters.Timeout);
  const timeout = temp > 1000 ? temp : 1000;
  console.log("Waiting for " + timeout + " ms");
  for (var i = 0; i < timeout; i = i + 1000) {
    try {
      await driver.sleep(1000);
      await driver.wait(async () => {
        return await driver.switchTo().alert();
      });
      return await updateStepResult(req, stepHistoryId, true);
    } catch (err) {
      if (processResult) processResult = false;
    }
  }
  console.log("Alter Not Found");
};
const waitUntilAbleToSwitchToFrame = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId
) => {
  //need fix
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = step.testParameters.RegEx;
  console.log("Waiting for " + timeout + " ms");
  try {
    await driver.wait(async () => {
      return until.ableToSwitchToFrame(RegEx, timeout);
    });
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
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
  waitUntilAlertPresent,
  waitUntilAbleToSwitchToFrame,
};
