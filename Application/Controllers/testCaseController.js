const db = require("../Utils/dataBaseConnection");
const getError = require("../Utils/sequelizeError");
const { createExecutionHistory } = require("./executionHistoryController");
const Process = db.process;
const Object = db.objects;
const TestParameter = db.testParameters;
const TestStep = db.testSteps;
const ReusableProcess = db.reusableProcess;
const ObjectLocator = db.ObjectLocators;
const User = db.users;

const getTestStepByTestCase = async (req, res) => {
  try {
    const executionHistory = await createExecutionHistory(req, res);

    const testCaseId = req.params.testCaseId;
    const testCaseData = await Process.schema(req.database).findAll({
      where: { testCaseId },
      include: [
        {
          model: TestStep.schema(req.database),
          include: [
            {
              model: Object.schema(req.database),
              include: [
                {
                  model: ObjectLocator.schema(req.database),
                  as: "locators",
                },

                {
                  model: User.schema(req.database),
                  as: "createdBy",
                  attributes: ["id", "name", "email", "active"],
                },
              ],
            },
            { model: TestParameter.schema(req.database) },
          ],
        },
        {
          model: ReusableProcess.schema(req.database),
          include: [
            {
              model: TestStep.schema(req.database),
              include: [
                {
                  model: Object.schema(req.database),
                  include: [
                    {
                      model: ObjectLocator.schema(req.database),
                      as: "locators",
                    },
                  ],
                },
                { model: TestParameter.schema(req.database) },
              ],
            },
          ],
        },
      ],
      order: [
        ["step", "ASC"],
        [TestStep, "step", "ASC"],
        [ReusableProcess, TestStep, "step", "ASC"],
      ],
    });

    const updatedTestCase = testCaseData.map((process) => {
      let tempTestCaseData = { ...process.dataValues };

      if (tempTestCaseData.reusableProcess != null) {
        tempTestCaseData.testSteps =
          tempTestCaseData.reusableProcess.dataValues.testSteps;
        delete tempTestCaseData.reusableProcess.dataValues.testSteps;
      }
      return tempTestCaseData;
    });

    return { executionHistory, data: updatedTestCase };
  } catch (err) {
    getError(err, res);
  }
};

module.exports = { getTestStepByTestCase };
