import express from "express";
import {
  addUser,
  deleteUser,
  changePassword,
  changeDetails,
  getTeam,
} from "../Controllers/userController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.get("/team", getTeam);

Router.post("/add", validatePermission("user", "add"), addUser);
Router.put("/details", changeDetails);
Router.put("/change-password", changePassword);
Router.delete("/:id", validatePermission("user", "delete"), deleteUser);

export default Router;
