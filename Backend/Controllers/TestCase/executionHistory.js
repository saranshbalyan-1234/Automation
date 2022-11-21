import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import moment from "moment";
import { deleteS3Folder } from "../awsController.js";
const ExecutionHistory = db.executionHistory;
const User = db.users;
const ProcessHistory = db.processHistory;
const TestStepHistory = db.testStepHistory;

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
          attributes: ["id", "name", "email", "active", "profileImage"],
        },
      ],
      order: [["createdAt", "DESC"]],
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
      deleteS3Folder(req.database, req.params.executionHistoryId);
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
          attributes: ["id", "name", "email", "active", "profileImage"],
        },
        {
          model: ProcessHistory.schema(req.database),
          as: "process",
          where: { executionHistoryId },
          include: [
            {
              model: TestStepHistory.schema(req.database),
              as: "testSteps",
              where: { executionHistoryId: executionHistoryId },
            },
          ],
        },
      ],
    }
  );
  let executionTime = "";
  if (executionHistory.dataValues.finishedAt) {
    let startingTime = moment(executionHistory.dataValues.createdAt);
    let timeTaken = moment(executionHistory.dataValues.finishedAt).diff(
      moment(startingTime),
      "seconds"
    );
    executionTime = moment.utc(timeTaken * 1000).format("HH:mm:ss");
  }

  return res
    .status(200)
    .json({ ...executionHistory.dataValues, executionTime });
};

export {
  getAllExecutionHistoryByTestCase,
  deleteExecutionHistory,
  getExecutionHistoryById,
};
