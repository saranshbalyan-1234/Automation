import express from "express";
import {
  getAllTestCase,
  saveTestCase,
  updateTestCase,
  deleteTestCase,
  getTestCaseDetailsById,
  getTestStepByTestCase,
} from "../../Controllers/TestCase/testCaseController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestCase);
Router.put(
  "/:testCaseId",
  validatePermission("Team & Role", "add"),
  updateTestCase
);
Router.get(
  "/:testCaseId/details",
  validatePermission("Team & Role", "add"),
  getTestCaseDetailsById
);

Router.get(
  "/project/:projectId",
  validatePermission("Team & Role", "add"),
  getAllTestCase
);

Router.get(
  "/:testCaseId/teststeps",
  validatePermission("Team & Role", "add"),
  getTestStepByTestCase
);

Router.delete(
  "/:testCaseId",
  validatePermission("Team & Role", "add"),
  deleteTestCase
);

export default Router;
