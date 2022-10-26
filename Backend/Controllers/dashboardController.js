import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const User = db.users;
const TestCase = db.testCases;
const ReusableFlow = db.reusableFlows;
const TestObject = db.testObjects;
const UserProject = db.userProjects;
const dashboard = async (req, res) => {
  /*  #swagger.tags = ["Global"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const user = await User.schema(req.database).count();
    const testCase = await TestCase.schema(req.database).count();
    const reusableFlow = await ReusableFlow.schema(req.database).count();
    const testObject = await TestObject.schema(req.database).count();

    const project = await UserProject.schema(req.database).count({
      where: { userId: req.user.id },
    });

    return res
      .status(200)
      .json({ project, user, testCase, reusableFlow, testObject });
  } catch (error) {
    getError(error, res);
  }
};

export { dashboard };
