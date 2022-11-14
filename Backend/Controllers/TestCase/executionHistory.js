import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";

const ExecutionHistory = db.executionHistory;
const User = db.users;

const getAllExecutionHistoryByTestCase = async (req, res) => {
  /*  #swagger.tags = ["Execution History"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  const testCaseId = req.params.testCaseId;
  try {
    const executionHistories = await ExecutionHistory.schema(
      req.database
    ).findAll({
      where: {
        testCaseId,
      },
      include: [
        {
          model: User.schema(req.database),
          as: "executedBy",
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    return res.status(200).json(executionHistories);
  } catch (err) {
    getError(err, res);
  }
};

const deleteExecutionHistory = async (req, res) => {
  /*  #swagger.tags = ["Execution History"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const executionHistoryId = req.params.executionHistoryId;

    const deletedExecutionHistory = await ExecutionHistory.schema(
      req.database
    ).destroy({
      where: { id: executionHistoryId },
    });

    if (deletedExecutionHistory > 0) {
      return res
        .status(200)
        .json({ message: "ExecutionHistory deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const getExecutionHistoryById = async (req, res) => {
  /*  #swagger.tags = ["Execution History"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  const executionHistoryId = req.params.executionHistoryId;
  const executionHistory = await ExecutionHistory.schema(req.database).findByPk(
    executionHistoryId,
    {
      include: [
        {
          model: User.schema(req.database),
          as: "executedBy",
          attributes: ["id", "name", "email", "active"],
        },
      ],
    }
  );
  return res.status(200).json(executionHistory);
};

export {
  getAllExecutionHistoryByTestCase,
  deleteExecutionHistory,
  getExecutionHistoryById,
};
