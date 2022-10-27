import express from "express";
import {
  getAllTestCase,
  saveTestCase,
  updateTestCase,
  deleteTestCase,
  getTestCaseDetailsById,
  getTestStepByTestCase,
  saveTestProcess,
  updateTestProcess,
  deleteTestProcess,
} from "../../Controllers/TestCase/testCaseController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("testcase", "add"), saveTestCase);
Router.post("/process", validatePermission("testcase", "add"), saveTestProcess);

Router.put(
  "/process/:processId",
  validatePermission("Ttestcase", "add"),
  updateTestProcess
);
Router.delete(
  "/process/:processId",
  validatePermission("testcase", "add"),
  deleteTestProcess
);

Router.put(
  "/:testCaseId",
  validatePermission("testcase", "add"),
  updateTestCase
);
Router.get(
  "/:testCaseId/details",
  validatePermission("testcase", "add"),
  getTestCaseDetailsById
);

Router.get(
  "/project/:projectId",
  validatePermission("testcase", "add"),
  getAllTestCase
);

Router.get(
  "/:testCaseId/teststeps",
  validatePermission("testcase", "add"),
  getTestStepByTestCase
);

Router.delete(
  "/:testCaseId",
  validatePermission("testcase", "add"),
  deleteTestCase
);

export default Router;
