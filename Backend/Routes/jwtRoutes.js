import express from "express";
import { refreshToken } from "../Utils/jwt.js";

const Router = express.Router();
Router.post("/refreshToken", refreshToken);
export default Router;
