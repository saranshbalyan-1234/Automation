import express from "express";
import {
  saveTestStep,
  updateTestStep,
  deleteTestStep,
} from "../../Controllers/TestCase/testStep.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Test Case", "edit"), saveTestStep);
Router.put(
  "/:testStepId",
  validatePermission("Test Case", "edit"),
  updateTestStep
);
Router.delete(
  "/:testStepId",
  validatePermission("Test Case", "edit"),
  deleteTestStep
);
export default Router;
