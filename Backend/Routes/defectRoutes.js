import express from "express";
import {
  getAllDefectByProject,
  getDefectSettings,
  saveDefect,
} from "../Controllers/Defect/defectController.js";
const Router = express.Router();
Router.get("/", getAllDefectByProject);
Router.post("/", saveDefect);
Router.get("/settings", getDefectSettings);
export default Router;
