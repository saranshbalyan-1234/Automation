import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const UserRole = db.userRoles;
const Role = db.roles;
const getRole = async (req, res) => {
  try {
    const roles = await UserRole.findAll({
      where: { userId: req.params.userId },

      include: [
        {
          model: Role,
          attributes: ["name"],
        },
      ],
    });
    const tempRole = roles.map((el) => {
      const temp = { ...el.dataValues, name: el.dataValues.role.name };
      delete temp.role;
      return temp;
    });

    return res.status(200).json(tempRole);
  } catch (error) {
    getError(error, res);
  }
};

const updateUserRole = async (req, res) => {
  try {
    await UserRole.destroy({ where: { userId: req.params.userId } });
    await UserRole.bulkCreate(req.body).then((resp) => {
      return res.status(200).json({ message: "User role updated." });
    });
  } catch (err) {
    getError(err, res);
  }
};

const destroy = (req, res) => {
  UserRole.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((resp) => {
      console.log(resp);
      if (resp > 0) {
        return res.status(200).json({ message: "Removed role from user" });
      } else {
        return res.status(400).json({ error: "Record not found" });
      }
    })
    .catch((e) => {
      getError(e, res);
    });
};

export { getRole, updateUserRole, destroy };
