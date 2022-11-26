const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");
const If = async (step, processResult, req, stepHistoryId, stepExtra) => {
  console.log("If");
  stepExtra.conditional = true;
  try {
    const value1 = step.testParameters.Value1;
    const value2 = step.testParameters.Value2;
    const condition = step.testParameters.Condition;

    if (eval(value1 + condition + value2)) {
      stepExtra.conditionalResult = true;
      return await updateStepResult(req, stepHistoryId, true);
    } else {
      stepExtra.conditionalResult = false;
      if (processResult.result) {
        return (processResult.result = false);
      }
    }
  } catch (err) {
    console.log(err);
    if (processResult.result) processResult.result = false;
  }
};
const ElseIf = async (step, processResult, req, stepHistoryId, stepExtra) => {
  console.log("Else If");
  try {
    stepExtra.conditional = true;
    const value1 = step.testParameters.Value1;
    const value2 = step.testParameters.Value2;
    const condition = step.testParameters.Condition;

    if (eval(value1 + condition + value2)) {
      stepExtra.conditionalResult = true;
      return await updateStepResult(req, stepHistoryId, true);
    } else {
      stepExtra.conditionalResult = false;
      if (processResult.result) {
        return (processResult.result = false);
      }
    }
  } catch (err) {
    console.log(err);
    if (processResult.result) processResult.result = false;
  }
};
const Else = async (step, processResult, req, stepHistoryId, stepExtra) => {
  console.log("Else");
  try {
    stepExtra.conditional = false;
    stepExtra.conditionalResult = false;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult.result) processResult.result = false;
  }
};
const EndIf = async (step, processResult, req, stepHistoryId, stepExtra) => {
  console.log("Else");
  try {
    stepExtra.conditional = false;
    stepExtra.conditionalResult = false;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    console.log(err);
    if (processResult.result) processResult.result = false;
  }
};

module.exports = { If, ElseIf, Else, EndIf };
