const db = require("../Utils/dataBaseConnection");
const getError = require("../Utils/sequelizeError");
const bcrypt = require("bcryptjs");

const Role = db.roles;
const userRole = db.userRoles;
const Permission = db.permissions;
const User = db.users;

const seedAll = async (req, res) => {
  await Role.bulkCreate([
    { name: "admin", global: 1 },
    { name: "user", global: 1 },
  ])
    .then(async (resp) => {
      const adminId = resp.find((el) => el.name == "admin").id;
      const userId = resp.find((el) => el.name == "user").id;
      await Permission.bulkCreate([
        {
          name: "role",
          add: 1,
          edit: 1,
          view: 1,
          delete: 1,
          roleId: adminId,
        },
        {
          name: "permission",
          add: 1,
          edit: 1,
          view: 1,
          delete: 1,
          roleId: adminId,
        },
        { name: "role", add: 0, edit: 0, view: 1, delete: 0, roleId: userId },
        {
          name: "permission",
          add: 0,
          edit: 0,
          view: 1,
          delete: 0,
          roleId: userId,
        },
      ]).catch((e) => {
        getError(e, res);
      });
      await bcrypt.hash("saransh", 8).then((hash) => {
        User.create({
          name: "saransh",
          email: "saransh@gmail.com",
          password: hash,
          verifiedAt: new Date(),
        })
          .then((resp1) => {
            userRole.create({ userId: resp1.id, roleId: adminId });
          })
          .catch((e) => {
            getError(e, res);
          });
      });
      res.status(201).json({ message: "Seeded initial data" });
    })
    .catch((e) => {
      getError(e, res);
    });
};

module.exports = {
  seedAll,
};
