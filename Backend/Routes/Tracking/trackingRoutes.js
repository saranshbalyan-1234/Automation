import express from "express";
import { trackingByDate } from "../../Controllers/Tracking/trackingController.js";

const Router = express.Router();

Router.post("/get", trackingByDate);

export default Router;
