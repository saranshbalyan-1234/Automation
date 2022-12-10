const db = require("../Utils/dataBaseConnection");
const getError = require("../Utils/sequelizeError");

const ExecutionHistory = db.executionHistory;
const ProcessHistory = db.processHistory;
const TestStepHistory = db.testStepHistory;

const createExecutionHistory = async (req, res) => {
  try {
    const payload = { ...req.body };
    const testCaseId = req.params.testCaseId;
    payload.executedByUser = req.user.id;
    payload.testCaseId = testCaseId;
    payload.result = null;

    res.status(200).json({ message: "Started Execution" });
    return await ExecutionHistory.schema(req.database).create(payload);
  } catch (err) {
    console.log(err);
    getError(err, res);
  }
};
const createProcessHistory = async (req, process, executionHistory) => {
  const payload = {};
  payload.executionHistoryId = executionHistory.id;
  payload.processId = process.id;
  payload.step = process.step;
  payload.name = process.name;
  payload.reusableProcess = process.reusableProcess;
  payload.comment = process.comment;
  payload.result = null;

  return await ProcessHistory.schema(req.database).create(payload);
};
const createStepHistory = async (
  req,
  step,
  executionHistory,
  processHistory
) => {
  const payload = {};
  payload.testStepId = step.id;
  payload.comment = step.comment;
  payload.actionEvent = step.actionEvent;
  payload.step = step.step;
  payload.object = step.object;
  payload.processId = processHistory.dataValues.processId;
  payload.screenshot = step.screenshot || executionHistory.recordAllSteps;
  payload.executionHistoryId = executionHistory.id;
  payload.result = null;
  payload.testParameters = Object.entries(step.testParameters).map((el) => {
    let temp = {};
    temp.type = el[0];
    temp.property = temp.type.toLowerCase().includes("password")
      ? "*".repeat(el[1].length)
      : el[1];
    return temp;
  });
  return await TestStepHistory.schema(req.database).create(payload);
};
const updateStepResult = async (req, id, result) => {
  if (!id) return console.log("Unable to update step result");
  try {
    return await TestStepHistory.schema(req.database).update(
      { result },
      {
        where: {
          id,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};
const updateProcessResult = async (req, id, result) => {
  return await ProcessHistory.schema(req.database).update(
    { result },
    {
      where: {
        id,
      },
    }
  );
};

const updateExecutionResult = async (req, id, time, result) => {
  return await ExecutionHistory.schema(req.database).update(
    { finishedAt: time, result: result },
    {
      where: {
        id,
      },
    }
  );
};

module.exports = {
  createExecutionHistory,
  createProcessHistory,
  createStepHistory,
  updateStepResult,
  updateProcessResult,
  updateExecutionResult,
};
