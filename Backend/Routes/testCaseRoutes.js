import express from "express";
import {
  getAllTestCase,
  saveTestCase,
  updateTestCase,
} from "../Controllers/testCaseController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestCase);
Router.put(
  "/:testCaseId",
  validatePermission("Team & Role", "add"),
  updateTestCase
);

Router.get(
  "/:projectId",
  validatePermission("Team & Role", "add"),
  getAllTestCase
);
export default Router;
