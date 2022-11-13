import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import { projectByIdValidation } from "../../Utils/Validations/project.js";
import {
  saveTestCaseValidation,
  updateTestCaseValidation,
  testCaseIdValidation,
} from "../../Utils/Validations/testCase.js";

const User = db.users;
const Object = db.objects;
const TestParameter = db.testParameters;
const TestStep = db.testSteps;
const ReusableProcess = db.reusableProcess;
const saveReusableProcess = async (req, res) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = saveTestCaseValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);
    const payload = { ...req.body };
    payload.createdByUser = req.user.id;
    const data = await ReusableProcess.schema(req.database).create(payload);
    return res.status(200).json({
      ...data.dataValues,
      message: "ReusableProcess created successfully!",
    });
  } catch (err) {
    getError(err, res);
  }
};

const updateReusableProcess = async (req, res) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const name = req.body.name;
    const reusableProcessId = req.params.reusableProcessId;
    // const { error } = updateTestCaseValidation.validate({ name, reusableProcessId });
    // if (error) throw new Error(error.details[0].message);

    const updatedReusableProcess = await ReusableProcess.schema(
      req.database
    ).update(
      { name },
      {
        where: {
          id: reusableProcessId,
        },
      }
    );

    if (updatedReusableProcess[0]) {
      return res
        .status(200)
        .json({ message: "ReusableProcess updated successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const getAllReusableProcess = async (req, res) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const projectId = req.headers["x-project-id"];
    const { error } = projectByIdValidation.validate({ projectId });
    if (error) throw new Error(error.details[0].message);

    const reusableProcesses = await ReusableProcess.schema(
      req.database
    ).findAll({
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

    return res.status(200).json(reusableProcesses);
  } catch (err) {
    getError(err, res);
  }
};

const deleteReusableProcess = async (req, res) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const reusableProcessId = req.params.reusableProcessId;
    // const { error } = testCaseIdValidation.validate({ reusableProcessId });
    // if (error) throw new Error(error.details[0].message);

    const deletedReusableProcess = await ReusableProcess.schema(
      req.database
    ).destroy({
      where: { id: reusableProcessId },
    });

    if (deletedReusableProcess > 0) {
      return res
        .status(200)
        .json({ message: "ReusableProcess deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};
const getReusableProcessDetailsById = async (req, res) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const reusableProcessId = req.params.reusableProcessId;
    // const { error } = projectByIdValidation.validate({ projectId });
    // if (error) throw new Error(error.details[0].message);

    const reusableProcess = await ReusableProcess.schema(req.database).findOne({
      where: {
        id: reusableProcessId,
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
    const totalSteps = await TestStep.schema(req.database).count({
      where: { reusableProcessId },
    });

    return res.status(200).json({ ...reusableProcess.dataValues, totalSteps });
  } catch (err) {
    getError(err, res);
  }
};

const getTestStepByReusableProcess = async (req, res) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);

    const reusableProcessId = req.params.reusableProcessId;
    const data = await TestStep.schema(req.database).findAll({
      where: { reusableProcessId },

      include: [
        { model: Object.schema(req.database) },
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
  saveReusableProcess,
  updateReusableProcess,
  getAllReusableProcess,
  deleteReusableProcess,
  getReusableProcessDetailsById,
  getTestStepByReusableProcess,
};
