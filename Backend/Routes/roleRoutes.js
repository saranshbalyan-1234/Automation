import express from "express";
import {
  findAll,
  findById,
  findByParam,
  update,
  save,
  destroy,
  updateRolePermission,
} from "../Controllers/roleController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/", validatePermission("role", "view"), findAll);
Router.get("/:id", validatePermission("role", "view"), findById);
Router.get("/getByParam", validatePermission("role", "view"), findByParam);
Router.post("/", validatePermission("role", "add"), save);
Router.put("/:id", validatePermission("role", "edit"), update);
Router.put(
  "/:roleId/permission",
  validatePermission("role", "edit"),
  updateRolePermission
);
Router.delete("/:id", validatePermission("role", "delete"), destroy);

export default Router;
