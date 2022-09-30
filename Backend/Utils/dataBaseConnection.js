import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

import Tenant from "../Models/CustomerAdmin/Tenant.js";
import Customer from "../Models/CustomerAdmin/Customer.js";
import Unverified from "../Models/CustomerAdmin/Unverified.js";
import Role from "../Models/RolePermission/Role.js";
import Permission from "../Models/RolePermission/Permission.js";
import User from "../Models/User.js";
import UserRole from "../Models/RolePermission/UserRole.js";

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

db.tenants = Tenant(sequelize, DataTypes);
db.customers = Customer(sequelize, DataTypes);
db.unverifieds = Unverified(sequelize, DataTypes);
db.permissions = Permission(sequelize, DataTypes);
db.roles = Role(sequelize, DataTypes);
db.userRoles = UserRole(sequelize, DataTypes);
db.users = User(sequelize, DataTypes);

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

export default db;
