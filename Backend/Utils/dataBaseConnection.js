import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

//Main
import Tenant from "../Models/CustomerAdmin/Tenant.js";
import Customer from "../Models/CustomerAdmin/Customer.js";
import Unverified from "../Models/CustomerAdmin/Unverified.js";
import PermissionList from "../Models/Global/PermissionList.js";
import ActionEvent from "../Models/Global/ActionEvent.js";

//Tenant
import Role from "../Models/RolePermission/Role.js";
import Permission from "../Models/RolePermission/Permission.js";
import User from "../Models/User.js";
import UserRole from "../Models/RolePermission/UserRole.js";
import Project from "../Models/Project/Project.js";
import UserProject from "../Models/Project/UserProject.js";

//TestCase
import TestCase from "../Models/TestCase/TestCase.js";
import TestParameter from "../Models/TestCase/TestParameter.js";
import TestStep from "../Models/TestCase/TestStep.js";
import Process from "../Models/TestCase/Process.js";
import ReusableProcess from "../Models/TestCase/ReusableProcess.js";
import ReusableProcessLog from "../Models/TestCase/ReusableProcessLog.js";
import TestCaseLog from "../Models/TestCase/TestCaseLog.js";

//Object
import Object from "../Models/TestCase/Object/Object.js";
import ObjectLocator from "../Models/TestCase/Object/ObjectLocator.js";
import ObjectLog from "../Models/TestCase/Object/ObjectLog.js";

//Execution History
import ExecutionHistory from "../Models/TestCase/ExecutionHistory/ExecutionHistory.js";
import ProcessHistory from "../Models/TestCase/ExecutionHistory/ProcessHistory.js";
import TestStepHistory from "../Models/TestCase/ExecutionHistory/TestStepHistory.js";

//Environment
import Environment from "../Models/TestCase/Environment/Environment.js";
import Column from "../Models/TestCase/Environment/Column.js";

//Defect
import Defect from "../Models/Defect/Defect.js";
import DefectPriority from "../Models/Defect/DefectPriority.js";
import DefectSeverity from "../Models/Defect/DefectSeverity.js";
import DefectStatus from "../Models/Defect/DefectStatus.js";
import DefectStatusMapping from "../Models/Defect/DefectStatusMapping.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER || "root",
  process.env.DATABASE_PASS || "ysoserious",

  {
    host: process.env.DATABASE_HOST || "localhost",
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

//Main
db.tenants = Tenant(sequelize, DataTypes);
db.customers = Customer(sequelize, DataTypes);
db.unverifieds = Unverified(sequelize, DataTypes);
db.permissionList = PermissionList(sequelize, DataTypes);
db.actionEvent = ActionEvent(sequelize, DataTypes);

//Tenant
db.permissions = Permission(sequelize, DataTypes);
db.userRoles = UserRole(sequelize, DataTypes);
db.userProjects = UserProject(sequelize, DataTypes);
db.projects = Project(sequelize, DataTypes);
db.roles = Role(sequelize, DataTypes);

//TestCase
db.testParameters = TestParameter(sequelize, DataTypes);
db.testSteps = TestStep(sequelize, DataTypes);
db.testCases = TestCase(sequelize, DataTypes);
db.process = Process(sequelize, DataTypes);
db.reusableProcess = ReusableProcess(sequelize, DataTypes);
db.reusableProcessLogs = ReusableProcessLog(sequelize, DataTypes);
db.testCaseLogs = TestCaseLog(sequelize, DataTypes);

//Object
db.objects = Object(sequelize, DataTypes);
db.ObjectLocators = ObjectLocator(sequelize, DataTypes);
db.objectLogs = ObjectLog(sequelize, DataTypes);

//executionHistory
db.executionHistory = ExecutionHistory(sequelize, DataTypes);
db.processHistory = ProcessHistory(sequelize, DataTypes);
db.testStepHistory = TestStepHistory(sequelize, DataTypes);

//Environment
db.enviroments = Environment(sequelize, DataTypes);
db.columns = Column(sequelize, DataTypes);

//Defect
db.defects = Defect(sequelize, DataTypes);
db.defectPriority = DefectPriority(sequelize, DataTypes);
db.defectSeverity = DefectSeverity(sequelize, DataTypes);
db.defectStatus = DefectStatus(sequelize, DataTypes);
db.defectStatusMapping = DefectStatusMapping(sequelize, DataTypes);

db.users = User(sequelize, DataTypes); //all associations

await db.tenants.schema("Main").sync({ force: false, alter: true });
db.customers.schema("Main").sync({ force: false, alter: true });
db.unverifieds.schema("Main").sync({ force: false, alter: true });
db.permissionList.schema("Main").sync({ force: false, alter: true });
db.actionEvent.schema("Main").sync({ force: false, alter: true });

// await db.defectStatus.schema("saranshbalyan123gmailcom").sync({ force: true });

export default db;
