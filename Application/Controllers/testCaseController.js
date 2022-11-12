const db = require("../Utils/dataBaseConnection");
const getError = require("../Utils/sequelizeError");
const { createExecutionHistory } = require("./executionHistoryController");
const Process = db.process;
const Object = db.objects;
const TestParameter = db.testParameters;
const TestStep = db.testSteps;
const ReusableProcess = db.reusableProcess;
const ObjectLocator = db.ObjectLocators;

const getTestStepByTestCase = async (req, res) => {
  try {
    const testCaseId = req.params.testCaseId;
    const testCaseData = await Process.schema(
      "saranshbalyan123gmailcom"
    ).findAll({
      where: { testCaseId },
      include: [
        {
          model: TestStep.schema("saranshbalyan123gmailcom"),
          include: [
            {
              model: Object.schema("saranshbalyan123gmailcom"),
              include: [
                {
                  model: ObjectLocator.schema("saranshbalyan123gmailcom"),
                  as: "locators",
                },
              ],
            },
            { model: TestParameter.schema("saranshbalyan123gmailcom") },
          ],
        },
        {
          model: ReusableProcess.schema("saranshbalyan123gmailcom"),
          include: [
            {
              model: TestStep.schema("saranshbalyan123gmailcom"),
              include: [
                {
                  model: Object.schema("saranshbalyan123gmailcom"),
                  include: [
                    {
                      model: ObjectLocator.schema("saranshbalyan123gmailcom"),
                      as: "locators",
                    },
                  ],
                },
                { model: TestParameter.schema("saranshbalyan123gmailcom") },
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

    await createExecutionHistory(req, res);
    return updatedTestCase;
  } catch (err) {
    getError(err, res);
  }
};

module.exports = { getTestStepByTestCase };
