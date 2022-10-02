import express from "express";
import {
  getAllRole,
  updateRole,
  saveRole,
  deleteRole,
  updateRolePermission,
} from "../Controllers/roleController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/", validatePermission("role", "view"), getAllRole);
Router.post("/", validatePermission("role", "add"), saveRole);
Router.put("/:id", validatePermission("role", "edit"), updateRole);
Router.put(
  "/:roleId/permission",
  validatePermission("role", "edit"),
  updateRolePermission
);
Router.delete("/:id", validatePermission("role", "delete"), deleteRole);

export default Router;
