import express from "express";
import {
  getAllReusableProcess,
  saveReusableProcess,
  updateReusableProcess,
  deleteReusableProcess,
  getReusableProcessDetailsById,
  getTestStepByReusableProcess,
} from "../../Controllers/TestCase/reusableProcessController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveReusableProcess);
Router.put(
  "/:reusableProcessId",
  validatePermission("Team & Role", "add"),
  updateReusableProcess
);
Router.get(
  "/:reusableProcessId/details",
  validatePermission("Team & Role", "add"),
  getReusableProcessDetailsById
);

Router.get(
  "/",
  validatePermission("Team & Role", "add"),
  getAllReusableProcess
);

Router.get(
  "/:reusableProcessId/teststeps",
  validatePermission("Team & Role", "add"),
  getTestStepByReusableProcess
);

Router.delete(
  "/:reusableProcessId",
  validatePermission("Team & Role", "add"),
  deleteReusableProcess
);

export default Router;
