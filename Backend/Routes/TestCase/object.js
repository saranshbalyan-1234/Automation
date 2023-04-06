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

Router.post("/", validatePermission("Object Bank", "add"), saveObject);
Router.put(
  "/:objectId",
  validatePermission("Object Bank", "update"),
  updateObject
);
Router.delete(
  "/:objectId",
  validatePermission("Object Bank", "delete"),
  deleteObject
);
Router.delete(
  "/locator/:locatorId",
  validatePermission("Object Bank", "edit"),
  deleteObjectLocator
);

Router.get("/", validatePermission("Object Bank", "view"), getAllObject);
Router.get(
  "/:objectId/details",
  validatePermission("Object Bank", "view"),
  getObjectDetailsById
);

Router.get(
  "/:objectId/locator",
  validatePermission("Object Bank", "view"),
  getObjectLocatorsByObjectId
);
Router.post(
  "/locator",
  validatePermission("Object Bank", "edit"),
  saveObjectLocator
);

Router.post(
  "/:objectId/logs",
  validatePermission("Object Bank", "edit"),
  createObjectLog
);
Router.get(
  "/:objectId/logs",
  validatePermission("Object Bank", "view"),
  getObjectLogsByObjectId
);

export default Router;
