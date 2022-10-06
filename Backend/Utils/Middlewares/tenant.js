import db from "../dataBaseConnection.js";
import getError from "../sequelizeError.js";
export const changeTenantDatabase = () => {
  return async (req, res, next) => {
    try {
      if (!req.validate) {
        await db.sequelize.query(`use Main`).then(() => {
          next();
        });
      } else {
        if (req.user.tenant) {
          let database = req.user.tenant.replace(/[^a-zA-Z0-9 ]/g, "");
          await db.sequelize.query(`use ${database}`).then(() => {
            next();
          });
        } else {
          return res.status(401).json({ error: "Invalid Tenant" });
        }
      }
    } catch (e) {
      return getError(e, res);
    }
  };
};
