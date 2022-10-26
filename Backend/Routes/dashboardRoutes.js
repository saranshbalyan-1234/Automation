import express from "express";
import { dashboard } from "../Controllers/dashboardController.js";
const Router = express.Router();
Router.get("/", dashboard);
export default Router;
