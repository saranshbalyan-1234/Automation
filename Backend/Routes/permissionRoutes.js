import express from "express";
import {
  findAll,
  findById,
  findByParam,
  save,
  update,
  destroy,
} from "../Controllers/permissionController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.get("/get", validatePermission("permission", "view"), findAll);
Router.get("/get/:id", validatePermission("permission", "view"), findById);
Router.get(
  "/getByParam",
  validatePermission("permission", "view"),
  findByParam
);
Router.post("/save", validatePermission("permission", "add"), save);
Router.put("/update/:id", validatePermission("permission", "edit"), update);
Router.delete(
  "/delete/:id",
  validatePermission("permission", "delete"),
  destroy
);

export default Router;
