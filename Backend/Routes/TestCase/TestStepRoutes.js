import express from "express";
import {
  saveTestStep,
  getTestStepByTestCase,
} from "../../Controllers/TestCase/TestStepController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestStep);
Router.get(
  "/testcase/:testCaseId",
  validatePermission("Team & Role", "add"),
  getTestStepByTestCase
);
export default Router;
