import express from "express";
import {
  getAllPermission,
  getAllActionEvent,
} from "../Controllers/globalController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.get(
  "/permission",
  validatePermission("Team & Role", "view"),
  getAllPermission
);
Router.get(
  "/actionEvent",
  validatePermission("Team & Role", "view"),
  getAllActionEvent
);

export default Router;
