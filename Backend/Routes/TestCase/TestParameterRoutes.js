import express from "express";
import { saveTestParameter } from "../../Controllers/TestCase/TestParameterController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestParameter);

export default Router;
