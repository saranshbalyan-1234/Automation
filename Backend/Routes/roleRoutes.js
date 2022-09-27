const express = require("express");
const Router = express.Router();
const roleController = require("../Controllers/roleController");
const { validatePermission } = require("../Utils/Middlewares/permissions");
Router.get("/get", validatePermission("role", "view"), roleController.findAll);
Router.get(
  "/get/:id",
  validatePermission("role", "view"),
  roleController.findById
);
Router.get(
  "/getByParam",
  validatePermission("role", "view"),
  roleController.findByParam
);
Router.post("/save", validatePermission("role", "add"), roleController.save);
Router.put(
  "/update/:id",
  validatePermission("role", "edit"),
  roleController.update
);
Router.delete(
  "/delete/:id",
  validatePermission("role", "delete"),
  roleController.destroy
);

module.exports = Router;
