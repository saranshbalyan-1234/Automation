const { findByLocator, handleActionEventError } = require("./utils");
const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");

const enterDateTime = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Entering Date Time ");

  try {
    const format = step.testParameters.Format;
    const tempDateTime = step.testParameters.DateTime;
    const momentDateTime =
      typeof tempDateTime == "string" ? moment(tempDateTime) : tempDateTime;
    const dateTime = momentDateTime.format(format);

    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(dateTime);
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

const getCurrentDateTime = async (
  step,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Getting Current Time");
  try {
    const dateTime = moment(new Date());
    output[step.testParameters.Output] = dateTime;
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

const getDateTime = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory,
  output
) => {
  try {
    const dateTime = step.testParameters.DateTime;
    console.log("Getting Date Time " + dateTime + " as " + format);

    const finalDateTime = moment(dateTime);
    output[step.testParameters.Output] = finalDateTime;
    if (finalDateTime == "Invalid date") throw new Error("Invalid Date");

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

const addDateTime = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory,
  output
) => {
  try {
    const dateTime = step.testParameters.DateTime;
    const dayMonthYear = step.testParameters["Day Month Year"].split(" ");

    const day = parseInt(dayMonthYear[0]);
    const month = parseInt(dayMonthYear[1]);
    const year = parseInt(dayMonthYear[2]);

    const hourMinSec = step.testParameters["Hour Min Sec"].split(" ");
    const hour = parseInt(hourMinSec[0]);
    const min = parseInt(hourMinSec[1]);
    const sec = parseInt(hourMinSec[2]);

    let finalDateTime =
      typeof dateTime == "string" ? moment(dateTime) : dateTime;

    if (day) finalDateTime = finalDateTime.add(day, "days");
    if (month) finalDateTime = moment(dateTime).add(month, "months");
    if (year) finalDateTime = moment(dateTime).add(year, "years");

    if (hour) finalDateTime = moment(dateTime).add(hour, "hours");
    if (min) finalDateTime = moment(dateTime).add(min, "minutes");
    if (sec) finalDateTime = moment(dateTime).add(sec, "seconds");

    console.log("Adding Date Time " + dayMonthYear + " " + hourMinSec);

    output[step.testParameters.Output] = finalDateTime;
    if (finalDateTime == "Invalid date") throw new Error("Invalid Date");
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
  enterDateTime,
  getCurrentDateTime,
  getDateTime,
  addDateTime,
};
