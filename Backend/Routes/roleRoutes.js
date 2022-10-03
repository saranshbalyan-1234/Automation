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

Router.get("/", validatePermission("Team & Role", "view"), getAllRole);
Router.post("/", validatePermission("Team & Role", "add"), saveRole);
Router.put("/:id", validatePermission("Team & Role", "edit"), updateRole);
Router.put(
  "/:roleId/permission",
  validatePermission("Team & Role", "edit"),
  updateRolePermission
);
Router.delete("/:id", validatePermission("Team & Role", "delete"), deleteRole);

export default Router;
