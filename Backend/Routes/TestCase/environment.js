import express from "express";
import {
  saveEnvironment,
  getAllEnvironmentsByTestCase,
  createColumnForEnvironment,
} from "../../Controllers/TestCase/environment.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get(
  "/testCase/:testCaseId",
  validatePermission("testcase", "view"),
  getAllEnvironmentsByTestCase
);
Router.post("/", validatePermission("testcase", "edit"), saveEnvironment);
Router.post(
  "/column/testCase/:testCaseId",
  validatePermission("testcase", "edit"),
  createColumnForEnvironment
);

export default Router;
