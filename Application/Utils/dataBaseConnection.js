const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const User = require("../Models/User");
const TestCase = require("../Models/TestCase/TestCase");
const Object = require("../Models/TestCase/Object/Object");
const ObjectLocator = require("../Models/TestCase/Object/ObjectLocator");
const TestParameter = require("../Models/TestCase/TestParameter");
const TestStep = require("../Models/TestCase/TestStep");
const Process = require("../Models/TestCase/Process");
const ReusableProcess = require("../Models/TestCase/ReusableProcess");

dotenv.config();

const sequelize = new Sequelize("Main", "root", "ysoserious", {
  host: "localhost",
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

db.testParameters = TestParameter(sequelize, DataTypes);
db.objects = Object(sequelize, DataTypes);
db.ObjectLocators = ObjectLocator(sequelize, DataTypes);
db.testSteps = TestStep(sequelize, DataTypes);
db.testCases = TestCase(sequelize, DataTypes);
db.process = Process(sequelize, DataTypes);
db.reusableProcess = ReusableProcess(sequelize, DataTypes);

db.users = User(sequelize, DataTypes); //all associations

module.exports = db;
