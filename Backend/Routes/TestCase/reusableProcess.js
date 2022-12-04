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

Router.post("/", validatePermission("Test Case", "edit"), saveReusableProcess);
Router.put(
  "/:reusableProcessId",
  validatePermission("Test Case", "edit"),
  updateReusableProcess
);
Router.get(
  "/:reusableProcessId/details",
  validatePermission("Test Case", "view"),
  getReusableProcessDetailsById
);

Router.get("/", validatePermission("Test Case", "view"), getAllReusableProcess);

Router.get(
  "/:reusableProcessId/teststeps",
  validatePermission("Test Case", "view"),
  getTestStepByReusableProcess
);

Router.delete(
  "/:reusableProcessId",
  validatePermission("Test Case", "edit"),
  deleteReusableProcess
);

export default Router;
