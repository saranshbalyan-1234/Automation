import express from "express";
import {
  saveTestObject,
  updateTestObject,
  deleteTestObject,
} from "../../Controllers/TestCase/TestObjectController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestObject);
Router.put(
  "/:testObjectId",
  validatePermission("Team & Role", "add"),
  updateTestObject
);
Router.delete(
  "/:testObjectId",
  validatePermission("Team & Role", "add"),
  deleteTestObject
);

export default Router;
