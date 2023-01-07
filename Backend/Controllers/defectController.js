import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
import { idValidation } from "../Utils/Validations/index.js";

const Defect = db.defects;
const DefectPriority = db.defectPriority;
const DefectStatus = db.defectStatus;
const DefectSeverity = db.defectSeverity;
const DefectStatusMapping = db.defectStatusMapping;

const getDefectSettings = async (req, res) => {
  /*  #swagger.tags = ["Defect"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const priority = await DefectPriority.schema(req.database).findAll({
      attributes: ["id", "name", "color"],
    });
    const severity = await DefectSeverity.schema(req.database).findAll({
      attributes: ["id", "name"],
    });
    const status = await DefectStatus.schema(req.database).findAll({
      attributes: ["id", "name"],
    });

    return res.status(200).json({ priority, severity, status });
  } catch (err) {
    getError(err, res);
  }
};

const getAllDefectByProject = async (req, res) => {
  /*  #swagger.tags = ["Defect"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const projectId = req.headers["x-project-id"];
    const { error } = idValidation.validate({ id: projectId });
    if (error) throw new Error(error.details[0].message);

    const defects = await Defect.schema(req.database).findAll({
      where: {
        projectId,
      },
      //   attributes: ["id", "name"],
    });
    return res.status(200).json(defects);
  } catch (err) {
    getError(err, res);
  }
};

const saveDefect = async (req, res) => {
  /*  #swagger.tags = ["Defect"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameDesTagPrjValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);
    const projectId = req.headers["x-project-id"];
    const payload = { ...req.body, reporterId: req.user.id, projectId };

    const defect = await Defect.schema(req.database).create(payload);
    // createDefectLog(req, res, defect.id, [
    //   `created the defect "${req.body.name}".`,
    // ]);
    return res.status(200).json(defect);
  } catch (err) {
    getError(err, res);
  }
};

const createDefectLog = async (req, res, id, logs = []) => {
  /*  #swagger.tags = ["Defect"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const objectId = req.params.objectId || id;
    const tempLogs = req.body.logs || logs;

    const { error } = createLogValidation.validate({
      id: objectId,
      logs: tempLogs,
    });
    if (error) throw new Error(error.details[0].message);

    const payload = tempLogs.map((el) => {
      return { log: el, objectId, createdByUser: req.user.id };
    });
    await ObjectLog.schema(req.database).bulkCreate(payload);
    if (logs.length == 0) return res.status(201).json("Log Created");
  } catch (err) {
    if (logs.length == 0) getError(err, res);
    else console.log(err);
  }
};

const getDefectDetailsById = async (req, res) => {
  /*  #swagger.tags = ["Defect"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const defectId = req.params.defectId;
    const { error } = idValidation.validate({ id: defectId });
    if (error) throw new Error(error.details[0].message);

    const defect = await Defect.schema(req.database).findOne({
      where: {
        id: defectId,
      },
    });

    return res.status(200).json(defect);
  } catch (err) {
    getError(err, res);
  }
};

const updateDefect = async (req, res) => {
  /*  #swagger.tags = ["Defect"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const defectId = req.params.defectId;
    // const { error } = updateObjectValidation.validate({
    //   ...req.body,
    //   objectId,
    // });
    // if (error) throw new Error(error.details[0].message);

    const updatedDefect = await Defect.schema(req.database).update(req.body, {
      where: {
        id: defectId,
      },
    });

    if (updatedDefect[0]) {
      return res.status(200).json({ message: "Defect updated successfully!" });
    } else {
      return res.status(400).json({ error: "Defect not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const deleteDefect = async (req, res) => {
  /*  #swagger.tags = ["Defect"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const defectId = req.params.defectId;

    const { error } = idValidation.validate({ id: defectId });
    if (error) throw new Error(error.details[0].message);

    const deletedDefect = await Defect.schema(req.database).destroy({
      where: { id: defectId },
    });

    if (deletedDefect > 0) {
      return res.status(200).json({ message: "Defect deleted successfully" });
    } else {
      return res.status(400).json({ error: "Defect not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

export {
  getDefectSettings,
  getAllDefectByProject,
  saveDefect,
  getDefectDetailsById,
  updateDefect,
  deleteDefect,
};
