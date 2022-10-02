import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";

// import { Op, QueryTypes } from "sequelize"
const Permission = db.permissions;
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

const update = async (req, res) => {
  await Permission.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(async (resp) => {
      if (resp[0]) {
        await Permission.findByPk(req.params.id)
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
  await Permission.findByPk(req.params.id)
    .then((resp) => {
      if (resp) return res.status(200).json(resp);
      else return res.status(400).json({ erros: ["Permission not found"] });
    })
    .catch((e) => {
      getError(e, res);
    });
};
const findAll = async (req, res) => {
  await Permission.findAll({})
    .then((resp) => {
      return res.status(200).json(resp);
    })
    .catch((e) => {
      getError(e, res);
    });
};

const findByParam = async (req, res) => {
  await Permission.findOne({
    where: req.body,
  })
    .then((resp) => {
      if (resp) return res.status(200).json(resp);
      else return res.status(400).json({ erros: ["Permission not found"] });
    })
    .catch((e) => {
      getError(e, res);
    });
};

const destroy = (req, res) => {
  Permission.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((resp) => {
      if (resp === 1) {
        return res
          .status(200)
          .json({ message: "Removed permission from role" });
      } else {
        return res.status(400).json({ error: "Record not found" });
      }
    })
    .catch((e) => {
      getError(e, res);
    });
};

export { update, findById, findByParam, findAll, destroy, getAllPermission };
