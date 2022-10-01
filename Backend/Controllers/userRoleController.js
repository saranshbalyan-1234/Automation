import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const UserRole = db.userRoles;
const save = async (req, res) => {
  await UserRole.create(req.body, {})
    .then((resp) => {
      return res.status(200).json(resp);
    })
    .catch((e) => {
      getError(e, res);
    });
};

const destroy = (req, res) => {
  UserRole.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((resp) => {
      if (resp === 1) {
        return res.status(200).json({ message: "Removed role from user" });
      } else {
        return res.status(400).json({ error: "Record not found" });
      }
    })
    .catch((e) => {
      getError(e, res);
    });
};

export { save, destroy };
