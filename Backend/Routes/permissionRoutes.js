import express from "express";
import { getAllPermission } from "../Controllers/permissionController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.get("/", getAllPermission);

getAllPermission;

export default Router;
