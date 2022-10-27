import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import { projectByIdValidation } from "../../Utils/Validations/project.js";
import {
  saveTestCaseValidation,
  updateTestCaseValidation,
  testCaseIdValidation,
} from "../../Utils/Validations/testCase.js";

const User = db.users;
const TestObject = db.testObjects;
const TestParameter = db.testParameters;
const TestStep = db.testSteps;
const ReusableFlow = db.reusableFlows;
const saveReusableFlow = async (req, res) => {
  /*  #swagger.tags = ["Reusable Flow"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = saveTestCaseValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);
    const payload = { ...req.body };
    payload.createdByUser = req.user.id;
    const data = await ReusableFlow.schema(req.database).create(payload);
    return res.status(200).json({
      ...data.dataValues,
      message: "ReusableFlow created successfully!",
    });
  } catch (err) {
    getError(err, res);
  }
};

const updateReusableFlow = async (req, res) => {
  /*  #swagger.tags = ["Reusable Flow"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const name = req.body.name;
    const reusableFlowId = req.params.reusableFlowId;
    // const { error } = updateTestCaseValidation.validate({ name, reusableFlowId });
    // if (error) throw new Error(error.details[0].message);

    const updatedReusableFlow = await ReusableFlow.schema(req.database).update(
      { name },
      {
        where: {
          id: reusableFlowId,
        },
      }
    );

    if (updatedReusableFlow[0]) {
      return res
        .status(200)
        .json({ message: "ReusableFlow updated successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const getAllReusableFlow = async (req, res) => {
  /*  #swagger.tags = ["Reusable Flow"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const projectId = req.params.projectId;
    const { error } = projectByIdValidation.validate({ projectId });
    if (error) throw new Error(error.details[0].message);

    const reusableFlows = await ReusableFlow.schema(req.database).findAll({
      where: {
        projectId,
      },
      attributes: ["id", "name", "updatedAt"],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    return res.status(200).json(reusableFlows);
  } catch (err) {
    getError(err, res);
  }
};

const deleteReusableFlow = async (req, res) => {
  /*  #swagger.tags = ["Reusable Flow"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const reusableFlowId = req.params.reusableFlowId;
    // const { error } = testCaseIdValidation.validate({ reusableFlowId });
    // if (error) throw new Error(error.details[0].message);

    const deletedReusableFlow = await ReusableFlow.schema(req.database).destroy(
      {
        where: { id: reusableFlowId },
      }
    );

    if (deletedReusableFlow > 0) {
      return res
        .status(200)
        .json({ message: "ReusableFlow deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};
const getReusableFlowDetailsById = async (req, res) => {
  /*  #swagger.tags = ["Reusable Flow"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const reusableFlowId = req.params.reusableFlowId;
    // const { error } = projectByIdValidation.validate({ projectId });
    // if (error) throw new Error(error.details[0].message);

    const reusableFlow = await ReusableFlow.schema(req.database).findOne({
      where: {
        id: reusableFlowId,
      },
      attributes: ["id", "name", "createdAt", "updatedAt", "description"],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    return res.status(200).json(reusableFlow);
  } catch (err) {
    getError(err, res);
  }
};

const getTestStepByReusableFlow = async (req, res) => {
  /*  #swagger.tags = ["Reusable Flow"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);

    const reusableFlowId = req.params.reusableFlowId;
    const data = await TestStep.schema(req.database).findAll({
      where: { reusableFlowId },

      include: [
        { model: TestObject.schema(req.database) },
        { model: TestParameter.schema(req.database) },
      ],
      order: [["step", "ASC"]],
    });

    return res.status(200).json(data);
  } catch (err) {
    getError(err, res);
  }
};

export {
  saveReusableFlow,
  updateReusableFlow,
  getAllReusableFlow,
  deleteReusableFlow,
  getReusableFlowDetailsById,
  getTestStepByReusableFlow,
};
