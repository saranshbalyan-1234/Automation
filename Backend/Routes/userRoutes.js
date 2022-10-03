import express from "express";
import {
  addUser,
  deleteUser,
  changePassword,
  changeDetails,
  getTeam,
  toggleUserActiveInactive,
  resentVerificationEmail,
  deleteCustomerUser,
} from "../Controllers/userController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.delete("/customer", deleteCustomerUser);
Router.get("/team", validatePermission("User & Role", "view"), getTeam);
Router.post(
  "/resend-verification-email",
  validatePermission("User & Role", "view"),
  resentVerificationEmail
);
Router.post("/add", validatePermission("User & Role", "add"), addUser);
Router.put("/details", changeDetails);
Router.put("/change-password", changePassword);
Router.delete("/:id", validatePermission("User & Role", "delete"), deleteUser);
Router.put(
  "/:userId/status",
  validatePermission("User & Role", "edit"),
  toggleUserActiveInactive
);

export default Router;
