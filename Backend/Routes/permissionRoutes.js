const express = require("express");
const Router = express.Router();
const permissionController = require("../Controllers/permissionController");
const { validatePermission } = require("../Utils/Middlewares/permissions");
Router.get(
  "/get",
  validatePermission("permission", "view"),
  permissionController.findAll
);
Router.get(
  "/get/:id",
  validatePermission("permission", "view"),
  permissionController.findById
);
Router.get(
  "/getByParam",
  validatePermission("permission", "view"),
  permissionController.findByParam
);
Router.post(
  "/save",
  validatePermission("permission", "add"),
  permissionController.save
);
Router.put(
  "/update/:id",
  validatePermission("permission", "edit"),
  permissionController.update
);
Router.delete(
  "/delete/:id",
  validatePermission("permission", "delete"),
  permissionController.destroy
);

module.exports = Router;
