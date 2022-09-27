const { extractToken, getTokenError } = require("../jwt");
const getError = require("../sequelizeError");
const { verify } = require("jsonwebtoken");
const validateToken = () => {
  return async (req, res, next) => {
    try {
      let notInclude = ["auth", "jwt"];
      const check = await notInclude.some((el) => {
        return req.url.includes(el);
      });
      if (!check) {
        const token = extractToken(req);
        if (token) {
          const data = verify(token, process.env.JWT_ACCESS_SECRET);
          if (data) {
            let temp = { ...data };
            delete temp.iat;
            delete temp.exp;
            req.user = temp;
            req.validate = true;
          }
        } else {
          return res.status(401).json({ error: "Access token not found" });
        }
      }
      next();
    } catch (e) {
      getError(e, res, "Access");
    }
  };
};

module.exports = { validateToken };
