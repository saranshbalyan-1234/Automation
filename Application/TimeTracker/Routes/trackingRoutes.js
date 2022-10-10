import express from "express";
import {
  saveOrUpdate,
  start,
  stop,
} from "../Controllers/trackingController.js";
const Router = express.Router();

Router.post("/save", saveOrUpdate);
Router.post("/start", start);
Router.post("/stop", stop);
export default Router;
