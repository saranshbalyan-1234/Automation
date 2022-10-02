import express from "express";
import { save, destroy, getRole } from "../Controllers/userRoleController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/:userId", validatePermission("user", "edit"), getRole);
Router.put("/user/:userId", validatePermission("user", "edit"), save);
Router.post("/delete", validatePermission("user", "edit"), destroy);

export default Router;
