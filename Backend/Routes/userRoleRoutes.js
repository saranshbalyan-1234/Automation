import express from "express";
import {
  updateUserRole,
  getUserRole,
} from "../Controllers/userRoleController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/:userId", validatePermission("user", "edit"), getUserRole);
Router.put("/user/:userId", validatePermission("user", "edit"), updateUserRole);

export default Router;
