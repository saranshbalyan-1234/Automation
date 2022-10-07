import express from "express";
import {
  getAllRole,
  updateRole,
  saveRole,
  deleteRole,
  updateRolePermission,
  getUserRole,
  updateUserRole,
} from "../Controllers/roleController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/", validatePermission("Team & Role", "view"), getAllRole);
Router.post("/", validatePermission("Team & Role", "add"), saveRole);
Router.put("/:roleId", validatePermission("Team & Role", "edit"), updateRole);
Router.put(
  "/:roleId/permission",
  validatePermission("Team & Role", "edit"),
  updateRolePermission
);
Router.delete(
  "/:roleId",
  validatePermission("Team & Role", "delete"),
  deleteRole
);

Router.get(
  "/user/:userId",
  validatePermission("Team & Role", "view"),
  getUserRole
);
Router.put(
  "/user/:userId",
  validatePermission("Team & Role", "edit"),
  updateUserRole
);

export default Router;
