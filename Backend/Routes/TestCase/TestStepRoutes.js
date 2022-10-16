import express from "express";
import { saveTestStep } from "../../Controllers/TestCase/TestStepController.js";
import { validatePermission } from "../../Utils/Middlewares/permissions.js";
const Router = express.Router();

Router.post("/", validatePermission("Team & Role", "add"), saveTestStep);

export default Router;
