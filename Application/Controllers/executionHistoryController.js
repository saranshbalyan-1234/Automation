const db = require("../Utils/dataBaseConnection");
const getError = require("../Utils/sequelizeError");

const ExecutionHistory = db.executionHistory;

const createExecutionHistory = async (req, res) => {
  try {
    const payload = { ...req.body };
    const testCaseId = req.params.testCaseId;
    payload.executedByUser = req.user.id;
    payload.testCaseId = testCaseId;

    await ExecutionHistory.schema(req.database).create(payload);

    res.status(200).json({ message: "Started Execution" });
  } catch (err) {
    getError(err, res);
  }
};

module.exports = { createExecutionHistory };
