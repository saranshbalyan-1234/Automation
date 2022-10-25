import express from "express";
import {
  saveTestObject,
  updateTestObject,
  deleteTestObject,
  getAllTestObject,
  getTestObjectDetailsById,
} from "../../Controllers/TestCase/TestObjectController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("testcase", "add"), saveTestObject);
Router.put(
  "/:testObjectId",
  validatePermission("testcase", "edit"),
  updateTestObject
);
Router.delete(
  "/:testObjectId",
  validatePermission("testcase", "delete"),
  deleteTestObject
);
Router.get(
  "/project/:projectId",
  validatePermission("testcase", "view"),
  getAllTestObject
);
Router.get(
  "/:testObjectId/details",
  validatePermission("Team & Role", "add"),
  getTestObjectDetailsById
);
export default Router;
