import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../Utils/Mail/nodeMailer.js";
import {
  registerValidation,
  changePasswordValidation,
  changeDetailsValidation,
} from "../Utils/hapiValidation.js";

const User = db.users;
const Customer = db.customers;

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const database = req.user.tenant.replace(/[^a-zA-Z0-9 ]/g, "");
    await db.sequelize.query(`use Main`);
    await Customer.create({ email, tenantName: req.user.tenant }).catch((e) => {
      throw new Error("User already exist");
    });

    await db.sequelize.query(`use ${database}`);

    const { error } = registerValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const hash = await bcrypt.hash(password, 8);
    const user = await User.create({ name, email, password: hash });
    sendMail({ email, name, tenant: database }, "addUser");

    return res.status(200).json({ id: user.id, name, email });
  } catch (error) {
    getError(error, res);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (req.user.tenant == user.email)
      throw new Error("Cannot Delete Customer Admin");
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedUser == 1) {
      await db.sequelize.query(`use Main`);
      const deletedCustomerUser = await Customer.destroy({
        where: {
          email: user.email,
        },
      });

      if (deletedCustomerUser == 1) {
        // const database = req.user.tenant.replace(/[^a-zA-Z0-9 ]/g, "");
        // await db.sequelize.query(`DROP DATABASE ${database}`);
        return res.status(200).json({ message: "User Deleted Successfully" });
      }
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    getError(error, res);
  }
};
const changePassword = async (req, res) => {
  try {
    const { error } = changePasswordValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);
    const isAuthenticated = await bcrypt.compare(oldPassword, user.password);
    if (!isAuthenticated)
      return res.status(400).json({ error: "Incorrect Password" });
    const hash = await bcrypt.hash(newPassword, 8);

    const updatedUser = await User.update(
      { password: hash },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    if (updatedUser[0])
      return res.status(200).json({ message: "Password Updated" });
    else throw new Error("User Not Registered");
  } catch (error) {
    getError(error, res);
  }
};

const changeDetails = async (req, res) => {
  try {
    const { error } = changeDetailsValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const updatedUser = await User.update(req.body, {
      where: {
        id: req.user.id,
      },
    });
    if (updatedUser[0])
      return res.status(200).json({ message: "Details Updated" });
    else throw new Error("User Not Registered");
  } catch (error) {
    getError(error, res);
  }
};

export { addUser, deleteUser, changePassword, changeDetails };
