import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import {
  saveTestStepValidation,
  updateTestStepValidation,
} from "../../Utils/Validations/testStep.js";
import { idValidation } from "../../Utils/Validations/index.js";
import { Op } from "sequelize";
const TestStep = db.testSteps;
const Object = db.objects;
const TestParameter = db.testParameters;
const saveTestStep = async (req, res) => {
  /*  #swagger.tags = ["Test Step"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const { processId, reusableProcessId, step } = req.body;

    let permissionName = reusableProcessId ? "Reusable Process" : "Test Case";

    if (!req.user.customerAdmin) {
      const allowed = await req.user.permissions.some((permission) => {
        return permissionName == permission.name && permission.add;
      });
      if (!allowed) return res.status(401).json({ error: "Unauthorized" });
    }

    const { error } = saveTestStepValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

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
          reusableProcessId: { [Op.eq]: reusableProcessId },
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

    const updatingStep = await TestStep.schema(req.database).findByPk(
      testStepId
    );

    let permissionName = updatingStep.reusableProcessId
      ? "Reusable Process"
      : "Test Case";

    if (!req.user.customerAdmin) {
      const allowed = await req.user.permissions.some((permission) => {
        return permissionName == permission.name && permission.edit;
      });
      if (!allowed) return res.status(401).json({ error: "Unauthorized" });
    }

    const { error } = updateTestStepValidation.validate({
      ...req.body,
      testStepId,
    });
    if (error) throw new Error(error.details[0].message);

    const updatedTestStep = await TestStep.schema(req.database).update(
      req.body,
      {
        where: {
          id: testStepId,
        },
      }
    );

    await TestParameter.schema(req.database).destroy({
      where: { testStepId },
    });

    const parameterPayload = req.body.parameters.map((el) => {
      return { ...el, testStepId };
    });

    await TestParameter.schema(req.database).bulkCreate(parameterPayload);

    if (updatedTestStep[0]) {
      const step = await TestStep.schema(req.database).findByPk(testStepId, {
        include: [
          { model: Object.schema(req.database) },
          { model: TestParameter.schema(req.database) },
        ],
      });

      return res.status(200).json({
        ...step.dataValues,
        message: "TestStep updated successfully!",
      });
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

    const deletingTestStep = await TestStep.schema(req.database).findByPk(
      testStepId
    );

    let permissionName = deletingTestStep.reusableProcessId
      ? "Reusable Process"
      : "Test Case";

    if (!req.user.customerAdmin) {
      const allowed = await req.user.permissions.some((permission) => {
        return permissionName == permission.name && permission.delete;
      });
      if (!allowed) return res.status(401).json({ error: "Unauthorized" });
    }

    const { error } = idValidation.validate({ id: testStepId });
    if (error) throw new Error(error.details[0].message);

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
            reusableProcessId: { [Op.eq]: deletingTestStep.reusableProcessId },
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
