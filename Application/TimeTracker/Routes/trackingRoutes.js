const express = require("express");
const {
  saveOrUpdate,
  start,
  stop,
} = require("../Controllers/trackingController.js");
const Router = express.Router();

Router.post("/save", saveOrUpdate);
Router.post("/start", start);
Router.post("/stop", stop);
module.exports = Router;
