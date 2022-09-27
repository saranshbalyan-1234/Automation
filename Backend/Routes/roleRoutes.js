import express from "express";
import {
  findAll,
  findById,
  findByParam,
  update,
  save,
  destroy,
} from "../Controllers/roleController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.get("/get", validatePermission("role", "view"), findAll);
Router.get("/get/:id", validatePermission("role", "view"), findById);
Router.get("/getByParam", validatePermission("role", "view"), findByParam);
Router.post("/save", validatePermission("role", "add"), save);
Router.put("/update/:id", validatePermission("role", "edit"), update);
Router.delete("/delete/:id", validatePermission("role", "delete"), destroy);

export default Router;
