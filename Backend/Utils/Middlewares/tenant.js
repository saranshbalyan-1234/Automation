const db = require("../dataBaseConnection");
const getError = require("../sequelizeError");
const changeTenantDatabase = () => {
  return async (req, res, next) => {
    try {
      if (!req.validate) {
        await db.sequelize.query(`use Main`);
      } else {
        if (req.user.tenant) {
          let database = req.user.tenant.replace(/[^a-zA-Z0-9 ]/g, "");
          await db.sequelize.query(`use ${database}`);
        } else {
          return res.status(401).json({ error: "Invalid Tenant" });
        }
      }

      next();
    } catch (e) {
      return getError(e, res);
    }
  };
};
module.exports = { changeTenantDatabase };
