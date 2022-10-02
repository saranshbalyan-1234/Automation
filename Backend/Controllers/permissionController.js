import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const PermissionList = db.permissionList;

const getAllPermission = async (req, res) => {
  try {
    await db.sequelize.query(`use Main`);
    const data = await PermissionList.findAll({ attributes: ["name"] });
    return res.status(200).json(data);
  } catch (error) {
    getError(error, res);
  }
};

export { getAllPermission };
