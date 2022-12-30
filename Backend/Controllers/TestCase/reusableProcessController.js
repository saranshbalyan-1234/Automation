import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import {
  idValidation,
  createLogValidation,
} from "../../Utils/Validations/index.js";
import { updateReusableProcessValidation } from "../../Utils/Validations/reusableProcess.js";
import { nameDesTagPrjValidation } from "../../Utils/Validations/index.js";

const User = db.users;
const Object = db.objects;
const TestParameter = db.testParameters;
const TestStep = db.testSteps;
const ReusableProcess = db.reusableProcess;
const ReusableProcessLog = db.reusableProcessLogs;
const saveReusableProcess = async (req, res) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const { error } = nameDesTagPrjValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    const payload = { ...req.body };
    payload.createdByUser = req.user.id;
    const data = await ReusableProcess.schema(req.database).create(payload);

    createReusableProcessLog(req, res, data.id, [
      `created the reusableProcess "${req.body.name}".`,
    ]);

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
    const reusableProcessId = req.params.reusableProcessId;
    const { error } = updateReusableProcessValidation.validate({
      ...req.body,
      reusableProcessId,
    });
    if (error) throw new Error(error.details[0].message);

    const updatedReusableProcess = await ReusableProcess.schema(
      req.database
    ).update(req.body, {
      where: {
        id: reusableProcessId,
      },
    });

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
    const { error } = idValidation.validate({ id: projectId });
    if (error) throw new Error(error.details[0].message);

    const reusableProcesses = await ReusableProcess.schema(
      req.database
    ).findAll({
      where: {
        projectId,
      },
      attributes: ["id", "name", "updatedAt", "createdAt", "tags"],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active", "profileImage"],
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
    const { error } = idValidation.validate({
      id: reusableProcessId,
    });
    if (error) throw new Error(error.details[0].message);

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
    const { error } = idValidation.validate({
      id: reusableProcessId,
    });
    if (error) throw new Error(error.details[0].message);
    const reusableProcess = await ReusableProcess.schema(req.database).findOne({
      where: {
        id: reusableProcessId,
      },
      attributes: [
        "id",
        "name",
        "createdAt",
        "updatedAt",
        "description",
        "tags",
      ],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active", "profileImage"],
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
    const reusableProcessId = req.params.reusableProcessId;
    const { error } = idValidation.validate({
      id: reusableProcessId,
    });
    if (error) throw new Error(error.details[0].message);

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

const getReusableProcessLogsById = async (req, res) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const reusableProcessId = req.params.reusableProcessId;

    const { error } = idValidation.validate({ id: reusableProcessId });
    if (error) throw new Error(error.details[0].message);

    const logs = await ReusableProcessLog.schema(req.database).findAll({
      where: {
        reusableProcessId,
      },
      attributes: ["log", "createdAt"],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active", "profileImage"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(logs);
  } catch (err) {
    getError(err, res);
  }
};

const createReusableProcessLog = async (req, res, id, logs = []) => {
  /*  #swagger.tags = ["Reusable Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const reusableProcessId = req.params.reusableProcessId || id;
    const tempLogs = req.body.logs || logs;

    const { error } = createLogValidation.validate({
      id: reusableProcessId,
      logs: tempLogs,
    });
    if (error) throw new Error(error.details[0].message);

    const payload = tempLogs.map((el) => {
      return { log: el, reusableProcessId, createdByUser: req.user.id };
    });
    await ReusableProcessLog.schema(req.database).bulkCreate(payload);
    if (logs.length == 0) res.status(201).json("Log Created");
  } catch (err) {
    if (logs.length == 0) getError(err, res);
    else console.log(err);
  }
};

export {
  saveReusableProcess,
  updateReusableProcess,
  getAllReusableProcess,
  deleteReusableProcess,
  getReusableProcessDetailsById,
  getTestStepByReusableProcess,
  createReusableProcessLog,
  getReusableProcessLogsById,
};
