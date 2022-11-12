import express from "express";
import {
  saveTestParameter,
  updateTestParameter,
  deleteTestParameter,
} from "../../Controllers/TestCase/testParameter.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestParameter);
Router.put(
  "/:testParameterId",
  validatePermission("Team & Role", "add"),
  updateTestParameter
);
Router.delete(
  "/:testParameterId",
  validatePermission("Team & Role", "add"),
  deleteTestParameter
);

export default Router;
