import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import Tracking from "../Models/Tracking.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,

  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    logging: false,
  }
);

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

export default db;
