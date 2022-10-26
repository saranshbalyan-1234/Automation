import express from "express";
import {
  saveTestObject,
  updateTestObject,
  deleteTestObject,
  getAllTestObject,
  getTestObjectDetailsById,
  saveObjectLocator,
  getObjectLocatorsByObjectId,
  deleteObjectLocator,
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
Router.delete(
  "/locator/:locatorId",
  validatePermission("testcase", "delete"),
  deleteObjectLocator
);

Router.get(
  "/project/:projectId",
  validatePermission("testcase", "view"),
  getAllTestObject
);
Router.get(
  "/:testObjectId/details",
  validatePermission("testcase", "add"),
  getTestObjectDetailsById
);

Router.get(
  "/:testObjectId/locator",
  validatePermission("testcase", "view"),
  getObjectLocatorsByObjectId
);
Router.post(
  "/locator",
  validatePermission("testcase", "edit"),
  saveObjectLocator
);

export default Router;
