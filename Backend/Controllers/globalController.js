import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const PermissionList = db.permissionList;
const ActionEvent = db.actionEvent;

const getAllPermission = async (req, res) => {
  /*  #swagger.tags = ["Global"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const data = await PermissionList.schema("Main").findAll({
      attributes: ["name"],
    });
    return res.status(200).json(data);
  } catch (error) {
    getError(error, res);
  }
};

const getAllActionEvent = async (req, res) => {
  /*  #swagger.tags = ["Global"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const data = await ActionEvent.schema("Main").findAll({
      attributes: ["name"],
    });
    return res.status(200).json(data);
  } catch (error) {
    getError(error, res);
  }
};

export { getAllPermission, getAllActionEvent };
