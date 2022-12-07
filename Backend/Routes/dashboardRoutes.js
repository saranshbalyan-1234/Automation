import express from "express";
import {
  dashboard,
  detailedExecutionReport,
} from "../Controllers/dashboardController.js";
const Router = express.Router();
Router.get("/", dashboard);
Router.get("/detailed-execution", detailedExecutionReport);
export default Router;
