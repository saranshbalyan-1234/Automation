import express from "express";
import { getAllPermission } from "../Controllers/Global/permissionController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.get(
  "/permission",
  validatePermission("Team & Role", "view"),
  getAllPermission
);

getAllPermission;

export default Router;
