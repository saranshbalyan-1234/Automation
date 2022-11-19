import express from "express";
import { deleteBucket } from "../Controllers/awsController.js";
const Router = express.Router();
Router.get("/", deleteBucket);
export default Router;
