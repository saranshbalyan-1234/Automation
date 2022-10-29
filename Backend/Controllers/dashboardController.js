import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const User = db.users;
const TestCase = db.testCases;
const ReusableFlow = db.reusableFlows;
const Object = db.objects;
const UserProject = db.userProjects;
const Project = db.projects;
const dashboard = async (req, res) => {
  /*  #swagger.tags = ["Dashboard"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const user = await User.schema(req.database).findAll();

    const active = user.filter((el) => {
      return el.active === true;
    }).length;
    const inactive = user.length - active;
    const unverified = user.filter((el) => {
      return el.verifiedAt === null;
    }).length;

    const testCase = await TestCase.schema(req.database).count({
      where: { createdByUser: req.user.id },
    });
    const reusableFlow = await ReusableFlow.schema(req.database).count({
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

    return res.status(200).json({
      project: userProject,
      user: { total: user.length, active, inactive, unverified },
      createdByMe: { Project: projects, testCase, object, reusableFlow },
    });
  } catch (error) {
    getError(error, res);
  }
};

export { dashboard };
