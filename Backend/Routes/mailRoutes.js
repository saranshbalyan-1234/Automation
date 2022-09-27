import express from "express";
import { sendMailApi } from "../Utils/Mail/nodeMailer.js";
const Router = express.Router();
Router.post("/sendMail", sendMailApi);
export default Router;
