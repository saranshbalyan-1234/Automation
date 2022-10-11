const { Sequelize, DataTypes } = require("sequelize");
const mysql2 = require("mysql2");

const Tracking = require("../Models/Tracking.js");

const sequelize = new Sequelize("Main", "admin", "ysoserious454", {
  host: "first.cqjcsrxo1aks.us-east-1.rds.amazonaws.com",
  dialect: "mysql",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("sequalize connected");
  })
  .catch((err) => {
    console.log("Sequalize Error", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.dialect.supports.schemas = true;

db.trackings = Tracking;

//Tracking

// db.trackings.sync({ force: false, alter: true });

module.exports = db;
