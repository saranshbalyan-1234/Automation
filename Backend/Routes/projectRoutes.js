import express from "express";
import {
  getMyProject,
  getProjectById,
  addProject,
  addMember,
  removeMember,
} from "../Controllers/projectController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/", validatePermission("project", "view"), getMyProject);
Router.get("/:id", validatePermission("project", "view"), getProjectById);
Router.post("/", validatePermission("project", "add"), addProject);
Router.post("/addMember", validatePermission("project", "edit"), addMember);
Router.post(
  "/removeMember",
  validatePermission("project", "edit"),
  removeMember
);

export default Router;
