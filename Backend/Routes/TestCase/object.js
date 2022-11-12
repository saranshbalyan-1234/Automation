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
} from "../../Controllers/TestCase/objectController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("testcase", "add"), saveObject);
Router.put("/:objectId", validatePermission("testcase", "edit"), updateObject);
Router.delete(
  "/:objectId",
  validatePermission("testcase", "delete"),
  deleteObject
);
Router.delete(
  "/locator/:locatorId",
  validatePermission("testcase", "delete"),
  deleteObjectLocator
);

Router.get("/", validatePermission("testcase", "view"), getAllObject);
Router.get(
  "/:objectId/details",
  validatePermission("testcase", "add"),
  getObjectDetailsById
);

Router.get(
  "/:objectId/locator",
  validatePermission("testcase", "view"),
  getObjectLocatorsByObjectId
);
Router.post(
  "/locator",
  validatePermission("testcase", "edit"),
  saveObjectLocator
);

export default Router;
