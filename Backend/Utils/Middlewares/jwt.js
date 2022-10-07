import { extractToken } from "../jwt.js";
import getError from "../sequelizeError.js";
import pkg from "jsonwebtoken";

const { verify } = pkg;
export const validateToken = () => {
  return async (req, res, next) => {
    try {
      const check = req.url.includes("auth");

      if (!check) {
        const token = extractToken(req);
        if (token) {
          const data = verify(token, process.env.JWT_ACCESS_SECRET);
          if (data) {
            let temp = { ...data };
            delete temp.iat;
            delete temp.exp;
            req.user = temp;
            let database = temp.tenant.replace(/[^a-zA-Z0-9 ]/g, "");
            req.database = database;
            // await db.sequelize.query(`use ${database}`);
            next();
          }
        } else {
          return res.status(401).json({ error: "Access token not found" });
        }
      } else {
        // await db.sequelize.query(`use Main`);
        next();
      }
    } catch (e) {
      getError(e, res, "Access");
    }
  };
};
