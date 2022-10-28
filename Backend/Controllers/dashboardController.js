import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const User = db.users;
const TestCase = db.testCases;
const ReusableFlow = db.reusableFlows;
const TestObject = db.testObjects;
const UserProject = db.userProjects;
const dashboard = async (req, res) => {
  /*  #swagger.tags = ["Dashboard"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const projectId = req.params.projectId;
    const user = await User.schema(req.database).findAll();

    const active = user.filter((el) => {
      return el.active === true;
    }).length;
    const inactive = user.length - active;
    const unverified = user.filter((el) => {
      return el.verifiedAt === null;
    }).length;

    const testCase = await TestCase.schema(req.database).count();
    const reusableFlow = await ReusableFlow.schema(req.database).count();
    const testObject = await TestObject.schema(req.database).count();

    const project = await UserProject.schema(req.database).count({
      where: { userId: req.user.id },
    });

    return res.status(200).json({
      project,
      user: { total: user.length, active, inactive, unverified },
      testCase,
      reusableFlow,
      testObject,
    });
  } catch (error) {
    getError(error, res);
  }
};

export { dashboard };
