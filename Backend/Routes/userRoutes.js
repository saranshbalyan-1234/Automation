const express = require("express");
const Router = express.Router();
const userController = require("../Controllers/userController");
const { validatePermission } = require("../Utils/Middlewares/permissions");
Router.post("/add", validatePermission("user", "add"), userController.addUser);
Router.delete(
  "/delete/:id",
  validatePermission("user", "delete"),
  userController.deleteUser
);

module.exports = Router;
