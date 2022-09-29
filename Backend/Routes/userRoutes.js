import express from "express";
import {
  addUser,
  deleteUser,
  changePassword,
} from "../Controllers/userController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.post("/add", validatePermission("user", "add"), addUser);
Router.post("/change-password", changePassword);
Router.delete("/delete/:id", validatePermission("user", "delete"), deleteUser);

export default Router;
