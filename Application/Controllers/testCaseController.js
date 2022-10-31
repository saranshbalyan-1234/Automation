const db = require("../Utils/dataBaseConnection");
const getError = require("../Utils/sequelizeError");
const Process = db.process;
const Object = db.objects;
const TestParameter = db.testParameters;
const TestStep = db.testSteps;

const getTestStepByTestCase = async (req, res) => {
  /*  #swagger.tags = ["Test Case"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testCaseId = req.params.testCaseId;
    const data = await Process.schema("saranshbalyan123gmailcom").findAll({
      where: { testCaseId },
      include: [
        {
          model: TestStep.schema("saranshbalyan123gmailcom"),
          include: [
            { model: Object.schema("saranshbalyan123gmailcom") },
            { model: TestParameter.schema("saranshbalyan123gmailcom") },
          ],
        },
      ],
      order: [
        ["step", "ASC"],
        [TestStep, "step", "ASC"],
      ],
    });

    return data;
  } catch (err) {
    getError(err, res);
  }
};

module.exports = { getTestStepByTestCase };
