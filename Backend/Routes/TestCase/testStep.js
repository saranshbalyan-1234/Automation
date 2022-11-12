import express from "express";
import {
  saveTestStep,
  updateTestStep,
  deleteTestStep,
} from "../../Controllers/TestCase/testStep.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestStep);
Router.put(
  "/:testStepId",
  validatePermission("Team & Role", "add"),
  updateTestStep
);
Router.delete(
  "/:testStepId",
  validatePermission("Team & Role", "add"),
  deleteTestStep
);
export default Router;
