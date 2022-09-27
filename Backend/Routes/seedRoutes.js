import express from "express";
import { seedAll } from "../Controllers/seedController.js";

const Router = express.Router();
Router.get("/all", seedAll);

export default Router;
