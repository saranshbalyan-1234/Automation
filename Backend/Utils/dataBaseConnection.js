const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
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

db.tenants = require("../Models/Tenant")(sequelize, DataTypes);
db.customers = require("../Models/Customer")(sequelize, DataTypes);
db.unverifieds = require("../Models/Unverified")(sequelize, DataTypes);
db.roles = require("../Models/Role")(sequelize, DataTypes);
db.permissions = require("../Models/Permission")(sequelize, DataTypes);
db.userRoles = require("../Models/UserRole")(sequelize, DataTypes);
db.users = require("../Models/User")(sequelize, DataTypes);

db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0").then(() => {
  db.tenants.sync({ force: false, alter: true }).then(() => {
    console.log("Synced tenants table");
    db.customers.sync({ force: false, alter: true }).then(() => {
      console.log("Synced customers table");
    });
  });
  db.unverifieds.sync({ force: false, alter: true }).then(() => {
    console.log("Synced Unverified table");
  });
});

module.exports = db;
