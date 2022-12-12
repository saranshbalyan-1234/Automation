const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");
const { handleActionEventError } = require("./utils");
const If = async (
  step,
  processResult,
  req,
  stepHistoryId,
  stepExtra,
  executionHistory
) => {
  console.log("If");
  stepExtra.conditional = true;
  stepExtra.conditionalType = "if";
  try {
    const value1 = step.testParameters.Value1;
    const value2 = step.testParameters.Value2;
    const condition = step.testParameters.Condition;
    if (isNaN(Number(value1)) || isNaN(Number(value2))) {
      if (condition == "==") {
        if (
          value1 == "true" ||
          value2 == "true" ||
          value1 == "false" ||
          value2 == "false"
        ) {
          let tempValue1 = false;
          let tempValue2 = false;
          if (value1 == "true") tempValue1 = true;
          if (value2 == "true") tempValue2 = true;
          if (tempValue1 == tempValue2) {
            stepExtra.conditionalResult = true;
            return await updateStepResult(req, stepHistoryId, true);
          } else {
            await updateStepResult(req, stepHistoryId, false);
            stepExtra.conditionalResult = false;
          }
        }
        if (value1 == value2) {
          stepExtra.conditionalResult = true;
          return await updateStepResult(req, stepHistoryId, true);
        } else {
          await updateStepResult(req, stepHistoryId, false);
          stepExtra.conditionalResult = false;
        }
      } else if (condition == "!=") {
        if (
          value1 == "true" ||
          value2 == "true" ||
          value1 == "false" ||
          value2 == "false"
        ) {
          let tempValue1 = false;
          let tempValue2 = false;
          if (value1 == "true") tempValue1 = true;
          if (value2 == "true") tempValue2 = true;
          if (tempValue1 != tempValue2) {
            stepExtra.conditionalResult = true;
            return await updateStepResult(req, stepHistoryId, true);
          } else {
            await updateStepResult(req, stepHistoryId, false);
            stepExtra.conditionalResult = false;
          }
        }
        if (value1 != value2) {
          stepExtra.conditionalResult = true;
          return await updateStepResult(req, stepHistoryId, true);
        } else {
          await updateStepResult(req, stepHistoryId, false);
          stepExtra.conditionalResult = false;
        }
      } else if (condition == ">=") {
        if (value1.length >= value2.length) {
          stepExtra.conditionalResult = true;
          return await updateStepResult(req, stepHistoryId, true);
        } else {
          await updateStepResult(req, stepHistoryId, false);
          stepExtra.conditionalResult = false;
        }
      } else if (condition == "<=") {
        if (value1.length <= value2.length) {
          stepExtra.conditionalResult = true;
          return await updateStepResult(req, stepHistoryId, true);
        } else {
          await updateStepResult(req, stepHistoryId, false);
          stepExtra.conditionalResult = false;
        }
      } else if (condition == ">") {
        if (value1.length > value2.length) {
          stepExtra.conditionalResult = true;
          return await updateStepResult(req, stepHistoryId, true);
        } else {
          await updateStepResult(req, stepHistoryId, false);
          stepExtra.conditionalResult = false;
        }
      } else if (condition == "<") {
        if (value1.length < value2.length) {
          stepExtra.conditionalResult = true;
          return await updateStepResult(req, stepHistoryId, true);
        } else {
          await updateStepResult(req, stepHistoryId, false);
          stepExtra.conditionalResult = false;
        }
      }
    } else if (condition == "notEmpty") {
      if (value1) {
        stepExtra.conditionalResult = true;
        return await updateStepResult(req, stepHistoryId, true);
      } else {
        await updateStepResult(req, stepHistoryId, false);
        stepExtra.conditionalResult = false;
      }
    } else if (condition == "empty") {
      if (!value1) {
        stepExtra.conditionalResult = true;
        return await updateStepResult(req, stepHistoryId, true);
      } else {
        await updateStepResult(req, stepHistoryId, false);
        stepExtra.conditionalResult = false;
      }
    } else {
      if (eval(value1 + condition + value2)) {
        stepExtra.conditionalResult = true;
        return await updateStepResult(req, stepHistoryId, true);
      } else {
        await updateStepResult(req, stepHistoryId, false);
        stepExtra.conditionalResult = false;
      }
    }
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
const EndCondition = async (
  processResult,
  req,
  stepHistoryId,
  stepExtra,
  executionHistory
) => {
  console.log("End Condition");
  try {
    stepExtra.conditional = false;
    stepExtra.conditionalResult = false;
    stepExtra.conditionalType = "";
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
const Else = async (
  processResult,
  req,
  stepHistoryId,
  stepExtra,
  executionHistory
) => {
  console.log("Else");
  try {
    stepExtra.conditionalType = "else";
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

module.exports = { If, Else, EndCondition };
