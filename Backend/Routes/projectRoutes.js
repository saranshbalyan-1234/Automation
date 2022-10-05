import express from "express";
import {
  getMyProject,
  getProjectById,
  addProject,
} from "../Controllers/projectController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/", validatePermission("project", "view"), getMyProject);
Router.get("/:id", validatePermission("project", "view"), getProjectById);
Router.post("/", validatePermission("project", "add"), addProject);
export default Router;
