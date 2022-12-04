import express from "express";
import { getObject } from "../Controllers/awsController.js";
import { validatePermission } from "../Utils/Middlewares/permissions.js";
const Router = express.Router();
Router.post("/object", validatePermission("Test Case", "view"), getObject);
export default Router;
