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

Router.get("/", validatePermission("User & Role", "view"), getAllRole);
Router.post("/", validatePermission("User & Role", "add"), saveRole);
Router.put("/:id", validatePermission("User & Role", "edit"), updateRole);
Router.put(
  "/:roleId/permission",
  validatePermission("User & Role", "edit"),
  updateRolePermission
);
Router.delete("/:id", validatePermission("User & Role", "delete"), deleteRole);

export default Router;
