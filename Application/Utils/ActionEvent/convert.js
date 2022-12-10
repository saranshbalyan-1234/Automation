const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");
const { handleActionEventError } = require("./utils");

const ConvertToString = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory,
  output
) => {
  console.log("Converting To String");
  try {
    const value = String(step.testParameters.Value);
    output[step.testParameters.Output] = value;
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
const ConvertToNumber = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Converting To Number");
  try {
    const value = Number(step.testParameters.Value);
    output[step.testParameters.Output] = value;
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
const ConvertToDateTime = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Converting To Date Time");
  try {
    const value = new Date(step.testParameters.Value);
    output[step.testParameters.Output] = value;
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
const ConvertToInteger = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Converting To Integer");
  try {
    const value = parseInt(step.testParameters.Value);
    output[step.testParameters.Output] = value;
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
const ConvertToFloat = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Converting To Float");
  try {
    const value = parseFloat(step.testParameters.Value);
    output[step.testParameters.Output] = value;
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

const ConvertToHex = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Converting To Hex");
  try {
    const value = step.testParameters.Value.toString(16);
    output[step.testParameters.Output] = value;
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
  ConvertToString,
  ConvertToNumber,
  ConvertToDateTime,
  ConvertToInteger,
  ConvertToFloat,
  ConvertToHex,
};
