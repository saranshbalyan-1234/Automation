import express from "express";
import {
  saveTestStep,
  updateTestStep,
} from "../../Controllers/TestCase/TestStepController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestStep);
Router.put(
  "/:testStepId",
  validatePermission("Team & Role", "add"),
  updateTestStep
);
export default Router;
