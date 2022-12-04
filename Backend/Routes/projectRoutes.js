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

Router.get("/", validatePermission("Project", "view"), getMyProject);
Router.get(
  "/:projectId",
  validatePermission("Project", "view"),
  getProjectById
);
Router.post("/", validatePermission("Project", "add"), addProject);
Router.post("/addMember", validatePermission("Project", "edit"), addMember);
Router.post(
  "/removeMember",
  validatePermission("Project", "edit"),
  deleteMember
);
Router.delete(
  "/:projectId",
  validatePermission("Project", "delete"),
  deleteProject
);
Router.put("/", validatePermission("Project", "edit"), editProject);
export default Router;
