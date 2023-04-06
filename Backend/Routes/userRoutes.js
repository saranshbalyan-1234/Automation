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
  myStatus,
} from "../Controllers/userController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.delete("/customer", deleteCustomerUser);
Router.get("/team", validatePermission("Team", "view"), getTeam);
Router.get("/my-status", myStatus);
Router.post("/add", validatePermission("Team", "add"), addUser);
Router.post("/resend-verification-email", resentVerificationEmail);
Router.delete("/:userId", validatePermission("Team", "delete"), deleteUser);
Router.put(
  "/:userId/status",
  validatePermission("Team", "edit"),
  toggleUserActiveInactive
);
Router.put("/uploadProfileImage", uploadProfileImage);
Router.put("/details", changeDetails);
Router.put("/change-password", changePassword);
export default Router;
