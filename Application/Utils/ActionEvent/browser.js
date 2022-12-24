const { findByLocator, handleActionEventError } = require("./utils");
const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");

const refreshPage = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    console.log("Refreshing Page");
    await driver.navigate().refresh();
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
const backPage = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    console.log("Back Page");
    await driver.navigate().back();
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

const forwardPage = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    console.log("Forward Page");
    await driver.navigate().forward();
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

const newTab = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    console.log("New Tab");
    await driver.switchTo().newWindow("tab");
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
const newWindow = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    console.log("New Window");
    await driver.switchTo().newWindow("window");
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

const closeBrowser = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Browser Closed");
  try {
    await driver.quit();
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

const maximizeBrowser = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Maximize Browser");
  try {
    await driver.manage().window().maximize();
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
  refreshPage,
  backPage,
  forwardPage,
  newTab,
  newWindow,
  closeBrowser,
  maximizeBrowser,
};
