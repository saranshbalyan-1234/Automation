import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const Role = db.roles;
const Permission = db.permissions;
const PermissionList = db.permissionList;
const save = async (req, res) => {
  await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await Role.create(req.body, {})
    .then((resp) => {
      return res.status(200).json(resp);
    })
    .catch((e) => {
      getError(e, res);
    });
};

const update = async (req, res) => {
  await Role.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(async (resp) => {
      if (resp[0]) {
        await Role.findByPk(req.params.id)
          .then((resp) => {
            return res.status(200).json(resp);
          })
          .catch((e) => {
            return res.status(500).json(e);
          });
      } else {
        return res.status(400).json({ error: "Record not found" });
      }
    })
    .catch((e) => {
      getError(e, res);
    });
};
const findById = async (req, res) => {
  await Role.findByPk(req.params.id)
    .then((resp) => {
      if (resp) return res.status(200).json(resp);
      else return res.status(400).json({ erros: ["Role not found"] });
    })
    .catch((e) => {
      getError(e, res);
    });
};
const findAll = async (req, res) => {
  await Role.findAll({
    include: [
      {
        model: Permission,
        attributes: ["id", "name", "view", "add", "edit", "delete"],
      },
    ],
  })
    .then((resp) => {
      return res.status(200).json(resp);
    })
    .catch((e) => {
      getError(e, res);
    });
};

const findByParam = async (req, res) => {
  await Role.findOne({
    where: req.body,
  })
    .then((resp) => {
      if (resp) return res.status(200).json(resp);
      else return res.status(400).json({ erros: ["Role not found"] });
    })
    .catch((e) => {
      getError(e, res);
    });
};

const destroy = (req, res) => {
  Role.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((resp) => {
      if (resp === 1) {
        return res.status(200).json({ message: "Role deleted successfully" });
      } else {
        return res.status(400).json({ error: "Record not found" });
      }
    })
    .catch((e) => {
      getError(e, res);
    });
};
const updateRolePermission = async (req, res) => {
  try {
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await db.sequelize.query(`use Main`);
    const data = await PermissionList.findAll({});

    await db.sequelize.query(
      `use ${req.user.tenant.replace(/[^a-zA-Z0-9 ]/g, "")}`
    );

    const check = data.some((el) => {
      return req.body.some((el1) => {
        return el.name == el1.name;
      });
    });

    if (check) {
      await Permission.destroy({ where: { roleId: req.params.roleId } });
      await Permission.bulkCreate(req.body).then((resp) => {
        return res.status(200).json(resp);
      });
    } else {
      return res.status(400).json({ error: "Inavlid Permission" });
    }
  } catch (error) {
    getError(error, res);
  }
};
export {
  save,
  update,
  findById,
  findByParam,
  findAll,
  destroy,
  updateRolePermission,
};
