import express from "express";
import {
  updateUserRole,
  getUserRole,
} from "../Controllers/userRoleController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/:userId", validatePermission("User & Role", "view"), getUserRole);
Router.put(
  "/user/:userId",
  validatePermission("User & Role", "edit"),
  updateUserRole
);

export default Router;
