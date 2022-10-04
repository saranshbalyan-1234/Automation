import express from "express";
import {
  register,
  login,
  verifyCustomer,
  verifyUser,
  sendResetPasswordMail,
  resetPassword,
} from "../Controllers/authController.js";
import { refreshToken } from "../Utils/jwt.js";
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.get("/verify-customer/:token", verifyCustomer);
Router.get("/verify-user/:token", verifyUser);
Router.post("/reset-password/send-mail", sendResetPasswordMail);
Router.post("/reset-password/:token", resetPassword);
Router.post("/refreshToken", refreshToken);

export default Router;
