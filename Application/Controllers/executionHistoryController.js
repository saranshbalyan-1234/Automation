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

    res.status(200).json({ message: "Started Execution" });
    return await ExecutionHistory.schema(req.database).create(payload);
  } catch (err) {
    getError(err, res);
  }
};
const createProcessHistory = async (req, process, executionHistory) => {
  const payload = {};
  payload.executionHistoryId = executionHistory.id;
  payload.processId = process.id;
  payload.step = process.step;
  payload.name = process.name;
  payload.reusableFlow = process.reusableFlow;
  payload.comment = process.comment;

  return await ProcessHistory.schema(req.database).create(payload);
};
const createStepHistory = async (req, step) => {
  const payload = {};
  payload.testStepId = step.id;
  payload.comment = step.comment;
  payload.actionEvent = step.actionEvent;
  payload.step = step.step;
  payload.object = step.object;
  payload.testParameters = step.testParameters;
  payload.processId = step.processId;
  payload.reusableProcessId = step.reusableProcessId;
  payload.screenshot = null;

  return await TestStepHistory.schema(req.database).create(payload);
};

module.exports = {
  createExecutionHistory,
  createProcessHistory,
  createStepHistory,
};
