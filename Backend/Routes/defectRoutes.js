import express from "express";
import {
  getAllDefectByProject,
  getDefectSettings,
} from "../Controllers/Defect/defectController.js";
const Router = express.Router();
Router.get("/", getAllDefectByProject);
Router.get("/settings", getDefectSettings);
export default Router;
