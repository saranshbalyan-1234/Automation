import express from "express";
import {
  saveObject,
  updateObject,
  deleteObject,
  getAllObject,
  getObjectDetailsById,
  saveObjectLocator,
  getObjectLocatorsByObjectId,
  deleteObjectLocator,
  getObjectLogsByObjectId,
  createObjectLog,
} from "../../Controllers/TestCase/object.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Test Case", "edit"), saveObject);
Router.put("/:objectId", validatePermission("Test Case", "edit"), updateObject);
Router.delete(
  "/:objectId",
  validatePermission("Test Case", "edit"),
  deleteObject
);
Router.delete(
  "/locator/:locatorId",
  validatePermission("Test Case", "edit"),
  deleteObjectLocator
);

Router.get("/", validatePermission("Test Case", "view"), getAllObject);
Router.get(
  "/:objectId/details",
  validatePermission("Test Case", "view"),
  getObjectDetailsById
);

Router.get(
  "/:objectId/logs",
  validatePermission("Test Case", "view"),
  getObjectLogsByObjectId
);

Router.get(
  "/:objectId/locator",
  validatePermission("Test Case", "view"),
  getObjectLocatorsByObjectId
);
Router.post(
  "/locator",
  validatePermission("Test Case", "edit"),
  saveObjectLocator
);

Router.post(
  "/:objectId/logs",
  validatePermission("Test Case", "edit"),
  createObjectLog
);

export default Router;
