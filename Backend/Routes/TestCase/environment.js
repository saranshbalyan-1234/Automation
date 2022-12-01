import express from "express";
import {
  createEnvironment,
  getAllEnvironmentsByTestCase,
  createColumnForEnvironment,
  updateColumnValue,
  getAllEnvironmentNamesByTestCase,
  deleteColumnFromEnvironment,
  deleteEnvironment,
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
Router.post("/", validatePermission("testcase", "edit"), createEnvironment);
Router.post(
  "/column/testCase/:testCaseId",
  validatePermission("testcase", "edit"),
  createColumnForEnvironment
);
Router.delete(
  "/column/:name/testCase/:testCaseId",
  validatePermission("testcase", "edit"),
  deleteColumnFromEnvironment
);
Router.delete(
  "/:envId",
  validatePermission("testcase", "edit"),
  deleteEnvironment
);
Router.put(
  "/column/value",
  validatePermission("testcase", "edit"),
  updateColumnValue
);

export default Router;
