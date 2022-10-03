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

Router.delete("/saransh", deleteCustomerUser);
Router.get("/team", getTeam);
Router.post("/resend-verification-email", resentVerificationEmail);
Router.post("/add", validatePermission("user", "add"), addUser);
Router.put("/details", changeDetails);
Router.put("/change-password", changePassword);
Router.delete("/:id", validatePermission("user", "delete"), deleteUser);
Router.put("/:userId/status", toggleUserActiveInactive);

export default Router;
