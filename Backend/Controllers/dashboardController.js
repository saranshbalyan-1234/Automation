import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
import { Sequelize } from "sequelize";
const User = db.users;
const TestCase = db.testCases;
const ReusableProcess = db.reusableProcess;
const Objects = db.objects;
const UserProject = db.userProjects;
const Project = db.projects;
const ExecutionHistory = db.executionHistory;
const dashboard = async (req, res) => {
  /*  #swagger.tags = ["Dashboard"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const user = await User.schema(req.database).findAll();

    //Users Start
    const Active = user.filter((el) => {
      return el.active === true;
    }).length;

    const Unverified = user.filter((el) => {
      return el.verifiedAt === null;
    }).length;
    const Inactive = user.length - Active - Unverified;
    const testCase = await TestCase.schema(req.database).count({
      where: { createdByUser: req.user.id },
    });
    //Users End

    //CreatedByMe Start
    const reusableProcess = await ReusableProcess.schema(req.database).count({
      where: { createdByUser: req.user.id },
    });
    const object = await Objects.schema(req.database).count({
      where: { createdByUser: req.user.id },
    });
    const projects = await Project.schema(req.database).count({
      where: { createdByUser: req.user.id },
    });

    const userProject = await UserProject.schema(req.database).count({
      where: { userId: req.user.id },
    });
    //CreatedByMe End

    //Execution History Start
    const totalHistory = await ExecutionHistory.schema(req.database).findAll({
      where: { executedByUser: req.user.id },
    });

    const incompleteHistory = totalHistory.filter((el) => {
      return el.dataValues.finishedAt == null;
    });

    // const completedHistory = totalHistory.length - incompleteHistory.length;

    const passedHistory = totalHistory.filter((el) => {
      return el.dataValues.result == true;
    });
    const failedHistory =
      totalHistory.length - passedHistory.length - incompleteHistory.length;
    //Execution History End
    return res.status(200).json({
      project: userProject,
      user: { total: user.length, Active, Inactive, Unverified },
      createdByMe: {
        Project: projects,
        TestCase: testCase,
        Object: object,
        Reusable: reusableProcess,
      },
      executionHistory: {
        Total: totalHistory.length,
        Incomplete: incompleteHistory.length,
        // Completed: completedHistory,
        Passed: passedHistory.length,
        Failed: failedHistory,
      },
    });
  } catch (error) {
    getError(error, res);
  }
};

const detailedExecutionReport = async (req, res) => {
  /*  #swagger.tags = ["Dashboard"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const passedHistory = await ExecutionHistory.schema(req.database).count({
      where: { result: true },
      attributes: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "Date"]],
      group: [Sequelize.fn("DATE", Sequelize.col("createdAt")), "Date"],
    });
    const failedHistory = await ExecutionHistory.schema(req.database).count({
      where: { result: false },
      attributes: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "Date"]],
      group: [Sequelize.fn("DATE", Sequelize.col("createdAt")), "Date"],
    });
    const incompleteHistory = await ExecutionHistory.schema(req.database).count(
      {
        where: { result: null },
        attributes: [
          [Sequelize.fn("DATE", Sequelize.col("createdAt")), "Date"],
        ],
        group: [Sequelize.fn("DATE", Sequelize.col("createdAt")), "Date"],
      }
    );

    let data = {};

    passedHistory.forEach((el) => {
      data[el.Date] = {
        ...data[el.Date],
        Passed: { ...data }[el.Date]?.Passed || 0 + el.count,
      };
    });
    failedHistory.forEach((el) => {
      data[el.Date] = {
        ...data[el.Date],
        Failed: { ...data }[el.Date]?.Failed || 0 + el.count,
      };
    });
    incompleteHistory.forEach((el) => {
      data[el.Date] = {
        ...data[el.Date],
        Incomplete: { ...data }[el.Date]?.Incomplete || 0 + el.count,
      };
    });
    let finalData = [];
    Object.entries(data).forEach((el) => {
      finalData.push({ date: el[0], type: "Passed", value: el[1].Passed || 0 });
      finalData.push({
        date: el[0],
        type: "Failed",
        value: el[1].Failed || 0,
      });
      finalData.push({
        date: el[0],
        type: "Incomplete",
        value: el[1].Incomplete || 0,
      });
      finalData.push({
        date: el[0],
        type: "Total",
        value:
          (el[1].Incomplete || 0) + (el[1].Failed || 0) + (el[1].Passed || 0),
      });
    });
    return res.status(200).json(finalData);
  } catch (error) {
    getError(error, res);
  }
};

export { dashboard, detailedExecutionReport };
