import express from "express";
import { saveTestObject } from "../../Controllers/TestCase/TestObjectController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestObject);

export default Router;
