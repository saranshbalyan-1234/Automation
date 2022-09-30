import express from "express";
import { save, destroy } from "../Controllers/userRoleController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/save", validatePermission("role", "add"), save);
Router.delete("/delete/:id", validatePermission("role", "delete"), destroy);

export default Router;
