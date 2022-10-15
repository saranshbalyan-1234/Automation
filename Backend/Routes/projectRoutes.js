import express from "express";
import {
  getMyProject,
  getProjectById,
  addProject,
  deleteProject,
  addMember,
  deleteMember,
  editProject,
} from "../Controllers/projectController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/", validatePermission("project", "view"), getMyProject);
Router.get(
  "/:projectId",
  validatePermission("project", "view"),
  getProjectById
);
Router.post("/", validatePermission("project", "add"), addProject);
Router.post("/addMember", validatePermission("project", "edit"), addMember);
Router.post(
  "/removeMember",
  validatePermission("project", "edit"),
  deleteMember
);
Router.delete(
  "/:projectId",
  validatePermission("project", "delete"),
  deleteProject
);
Router.put("/:projectId", validatePermission("project", "delete"), editProject);
export default Router;
