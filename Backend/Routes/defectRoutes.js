import express from "express";
import {
  getAllDefectByProject,
  getDefectSettings,
  saveDefect,
  getDefectDetailsById,
  updateDefect,
  deleteDefect,
} from "../Controllers/defectController.js";
const Router = express.Router();
Router.get("/", getAllDefectByProject);
Router.post("/", saveDefect);
Router.get("/settings", getDefectSettings);
Router.get("/:defectId", getDefectDetailsById);
Router.put("/:defectId", updateDefect);
Router.delete("/:defectId", deleteDefect);
export default Router;
