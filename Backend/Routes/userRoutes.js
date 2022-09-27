import express from "express";
import { addUser, deleteUser } from "../Controllers/userController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.post("/add", validatePermission("user", "add"), addUser);
Router.delete("/delete/:id", validatePermission("user", "delete"), deleteUser);

export default Router;
