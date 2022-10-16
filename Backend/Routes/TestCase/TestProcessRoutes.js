import express from "express";
import {
  saveTestProcess,
  updateTestProcess,
  deleteTestProcess,
} from "../../Controllers/TestCase/TestProcessController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestProcess);
Router.put(
  "/:testProcessId",
  validatePermission("Team & Role", "add"),
  updateTestProcess
);
Router.delete(
  "/:testProcessId",
  validatePermission("Team & Role", "add"),
  deleteTestProcess
);

export default Router;
