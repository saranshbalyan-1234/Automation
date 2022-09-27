import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";

// const { Op, QueryTypes } = require("sequelize");
const Role = db.roles;
const Permission = db.permissions;
const save = async (req, res) => {
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
  await Role.findAll({})
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
        return res.status(200).json({ message: "Deleted successfully" });
      } else {
        return res.status(400).json({ error: "Record not found" });
      }
    })
    .catch((e) => {
      getError(e, res);
    });
};

// const rawQuery = async (req, res) => {
//   const data = await db.sequelize.query(
//     "SELECT * from roles where name=:name",
//     {
//       type: QueryTypes.SELECT,
//       replacements: { name: "saransh" },
//     }
//   );
//   return res.status(200).json(data);
// };

export {
  save,
  update,
  findById,
  findByParam,
  findAll,
  destroy,
  // rawQuery,
};
