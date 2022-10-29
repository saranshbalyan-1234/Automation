import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import { Op } from "sequelize";
const TestStep = db.testSteps;
const Object = db.objects;
const TestParameter = db.testParameters;
const saveTestStep = async (req, res) => {
  /*  #swagger.tags = ["Test Step"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);

    const { processId, reusableFlowId, step } = req.body;

    if (processId) {
      await TestStep.schema(req.database).increment("step", {
        by: 1,
        where: {
          processId: { [Op.eq]: processId },
          step: {
            [Op.gte]: step,
          },
        },
      });
    } else {
      await TestStep.schema(req.database).increment("step", {
        by: 1,
        where: {
          reusableFlowId: { [Op.eq]: reusableFlowId },
          step: {
            [Op.gte]: step,
          },
        },
      });
    }
    const teststep = await TestStep.schema(req.database).create(req.body);
    const parameterPayload = req.body.parameters.map((el) => {
      return { ...el, testStepId: teststep.id };
    });
    await TestParameter.schema(req.database).bulkCreate(parameterPayload);
    const stepData = await TestStep.schema(req.database).findByPk(teststep.id, {
      include: [
        { model: Object.schema(req.database) },
        { model: TestParameter.schema(req.database) },
      ],
    });

    return res.status(200).json(stepData);
  } catch (err) {
    getError(err, res);
  }
};

const updateTestStep = async (req, res) => {
  /*  #swagger.tags = ["Test Step"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testStepId = req.params.testStepId;
    // const { error } = updateTestCaseValidation.validate({ name, testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const updatedTestStep = await TestStep.schema(req.database).update(
      req.body,
      {
        where: {
          id: testStepId,
        },
      }
    );

    if (updatedTestStep[0]) {
      return res
        .status(200)
        .json({ message: "TestStep updated successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    console.log(err);
    getError(err, res);
  }
};

const deleteTestStep = async (req, res) => {
  /*  #swagger.tags = ["Test Step"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testStepId = req.params.testStepId;
    // const { error } = testCaseIdValidation.validate({ testCaseId });
    // if (error) throw new Error(error.details[0].message);
    const deletingTestStep = await TestStep.schema(req.database).findByPk(
      testStepId
    );

    const deletedTestStep = await TestStep.schema(req.database).destroy({
      where: { id: testStepId },
    });

    if (deletedTestStep > 0) {
      if (deletingTestStep.processId) {
        await TestStep.schema(req.database).decrement("step", {
          by: 1,
          where: {
            processId: { [Op.eq]: deletingTestStep.processId },
            step: {
              [Op.gt]: deletingTestStep.step,
            },
          },
        });
      } else {
        await TestStep.schema(req.database).decrement("step", {
          by: 1,
          where: {
            reusableFlowId: { [Op.eq]: deletingTestStep.reusableFlowId },
            step: {
              [Op.gt]: deletingTestStep.step,
            },
          },
        });
      }
      return res.status(200).json({ message: "TestStep deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

export { saveTestStep, updateTestStep, deleteTestStep };
