const express = require("express");
const Router = express.Router();
const seedController = require("../Controllers/seedController");

Router.get("/all", seedController.seedAll);

module.exports = Router;
