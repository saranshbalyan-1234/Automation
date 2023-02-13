import express from "express";
import {
  getAllExecutionHistoryByTestCase,
  deleteExecutionHistoryById,
  deleteExecutionHistoryByTestCase,
  getExecutionHistoryById,
} from "../../Controllers/TestCase/executionHistory.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.delete(
  "/:executionHistoryId",
  validatePermission("Test Case", "delete"),
  deleteExecutionHistoryById
);
Router.delete(
  "/testCase/:testCaseId",
  validatePermission("Test Case", "delete"),
  deleteExecutionHistoryByTestCase
);
Router.get(
  "/:executionHistoryId",
  validatePermission("Test Case", "view"),
  getExecutionHistoryById
);
Router.get(
  "/testCase/:testCaseId",
  validatePermission("Test Case", "view"),
  getAllExecutionHistoryByTestCase
);

export default Router;
