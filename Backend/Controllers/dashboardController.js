import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const User = db.users;
const TestCase = db.testCases;
const ReusableProcess = db.reusableProcess;
const Object = db.objects;
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
    const object = await Object.schema(req.database).count({
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
    const totalExecutionHistory = await ExecutionHistory.schema(
      req.database
    ).findAll({
      where: { executedByUser: req.user.id },
    });

    const failedExecutionHistory = totalExecutionHistory.filter((el) => {
      return el.dataValues.finishedAt == null;
    });
    const completedExecutionHistory =
      totalExecutionHistory.length - failedExecutionHistory.length;
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
        Total: totalExecutionHistory.length,
        Completed: completedExecutionHistory,
        Failed: failedExecutionHistory.length,
      },
    });
  } catch (error) {
    getError(error, res);
  }
};

export { dashboard };
