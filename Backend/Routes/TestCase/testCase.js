import express from "express";
import {
  getAllTestCase,
  saveTestCase,
  updateTestCase,
  deleteTestCase,
  getTestCaseDetailsById,
  getTestStepByTestCase,
  saveProcess,
  updateProcess,
  deleteProcess,
} from "../../Controllers/TestCase/testCaseController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Test Case", "add"), saveTestCase);
Router.post("/process", validatePermission("Test Case", "edit"), saveProcess);

Router.put(
  "/process/:processId",
  validatePermission("Test Case", "edit"),
  updateProcess
);
Router.delete(
  "/process/:processId",
  validatePermission("Test Case", "edit"),
  deleteProcess
);

Router.put(
  "/:testCaseId",
  validatePermission("Test Case", "edit"),
  updateTestCase
);
Router.get(
  "/:testCaseId/details",
  validatePermission("Test Case", "view"),
  getTestCaseDetailsById
);

Router.get("/", validatePermission("Test Case", "view"), getAllTestCase);

Router.get(
  "/:testCaseId/teststeps",
  validatePermission("Test Case", "view"),
  getTestStepByTestCase
);

Router.delete(
  "/:testCaseId",
  validatePermission("Test Case", "delete"),
  deleteTestCase
);

export default Router;
