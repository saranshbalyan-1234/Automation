import express from "express";
import {
  findAll,
  findById,
  findByParam,
  update,
  destroy,
  getAllPermission,
} from "../Controllers/permissionController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.get("/", getAllPermission);
// Router.get("", validatePermission("permission", "view"), findAll);
Router.get("/:id", validatePermission("permission", "view"), findById);
Router.get(
  "/getByParam",
  validatePermission("permission", "view"),
  findByParam
);

Router.put("/:id", validatePermission("permission", "edit"), update);
Router.delete("/:id", validatePermission("permission", "delete"), destroy);

getAllPermission;

export default Router;
