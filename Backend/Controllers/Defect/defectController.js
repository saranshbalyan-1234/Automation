import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import { idValidation } from "../../Utils/Validations/index.js";

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
      attributes: ["name"],
    });
    const severity = await DefectSeverity.schema(req.database).findAll({
      attributes: ["name"],
    });
    const status = await DefectStatus.schema(req.database).findAll({
      attributes: ["name", "parentStatusId"],
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

export { getDefectSettings, getAllDefectByProject };
