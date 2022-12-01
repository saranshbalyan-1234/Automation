import express from "express";
import {
  saveEnvironment,
  getAllEnvironmentsByTestCase,
  createColumnForEnvironment,
  updateColumnValue,
  getAllEnvironmentNamesByTestCase,
} from "../../Controllers/TestCase/environment.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get(
  "/testCase/:testCaseId",
  validatePermission("testcase", "view"),
  getAllEnvironmentsByTestCase
);
Router.get(
  "/names/testCase/:testCaseId",
  validatePermission("testcase", "view"),
  getAllEnvironmentNamesByTestCase
);
Router.post("/", validatePermission("testcase", "edit"), saveEnvironment);
Router.post(
  "/column/testCase/:testCaseId",
  validatePermission("testcase", "edit"),
  createColumnForEnvironment
);
Router.put(
  "/column/value",
  validatePermission("testcase", "edit"),
  updateColumnValue
);

export default Router;
