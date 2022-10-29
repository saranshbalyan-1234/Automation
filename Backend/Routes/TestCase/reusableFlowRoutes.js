import express from "express";
import {
  getAllReusableFlow,
  saveReusableFlow,
  updateReusableFlow,
  deleteReusableFlow,
  getReusableFlowDetailsById,
  getTestStepByReusableFlow,
} from "../../Controllers/TestCase/reusableFlowController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveReusableFlow);
Router.put(
  "/:reusableFlowId",
  validatePermission("Team & Role", "add"),
  updateReusableFlow
);
Router.get(
  "/:reusableFlowId/details",
  validatePermission("Team & Role", "add"),
  getReusableFlowDetailsById
);

Router.get("/", validatePermission("Team & Role", "add"), getAllReusableFlow);

Router.get(
  "/:reusableFlowId/teststeps",
  validatePermission("Team & Role", "add"),
  getTestStepByReusableFlow
);

Router.delete(
  "/:reusableFlowId",
  validatePermission("Team & Role", "add"),
  deleteReusableFlow
);

export default Router;
