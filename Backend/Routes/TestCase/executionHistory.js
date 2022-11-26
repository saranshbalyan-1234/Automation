import express from "express";
import {
  getAllExecutionHistoryByTestCase,
  deleteExecutionHistory,
  getExecutionHistoryById,
} from "../../Controllers/TestCase/executionHistory.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.delete(
  "/:executionHistoryId",
  validatePermission("testcase", "delete"),
  deleteExecutionHistory
);
Router.get(
  "/:executionHistoryId",
  validatePermission("testcase", "delete"),
  getExecutionHistoryById
);
Router.get(
  "/testCase/:testCaseId",
  validatePermission("testcase", "add"),
  getAllExecutionHistoryByTestCase
);

export default Router;
