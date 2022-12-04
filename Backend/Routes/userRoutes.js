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
  uploadProfileImage,
} from "../Controllers/userController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.delete("/customer", deleteCustomerUser);
Router.get("/team", validatePermission("Team & Role", "view"), getTeam);
Router.post("/add", validatePermission("Team & Role", "add"), addUser);
Router.post("/resend-verification-email", resentVerificationEmail);
Router.delete(
  "/:userId",
  validatePermission("Team & Role", "delete"),
  deleteUser
);
Router.put(
  "/:userId/status",
  validatePermission("Team & Role", "edit"),
  toggleUserActiveInactive
);
Router.put("/uploadProfileImage", uploadProfileImage);
Router.put("/details", changeDetails);
Router.put("/change-password", changePassword);
export default Router;
