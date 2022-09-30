import db from "../Utils/dataBaseConnection.js";
import bcrypt from "bcryptjs";
import { createToken } from "../Utils/jwt.js";
import { sendMail } from "../Utils/Mail/nodeMailer.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
import {
  registerValidation,
  loginValidation,
} from "../Utils/hapiValidation.js";
import getError from "../Utils/sequelizeError.js";

const User = db.users;
const UserRole = db.userRoles;
const Permission = db.permissions;
const Role = db.roles;
const Customer = db.customers;
const Tenant = db.tenants;
const Unverified = db.unverifieds;

const register = async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const { name, email, password } = req.body;

    await Tenant.create({ name: email }).catch((e) => {
      throw new Error("Tenant already exist");
    });
    await Customer.create({ email, tenantName: email }).catch(() => {
      throw new Error("Customer already exist");
    });
    const hash = await bcrypt.hash(password, 8);
    await Unverified.create({ name, email, password: hash });
    sendMail({ email, name }, "customerRegister");

    return res.status(200).json({
      message: "Registered successfuly, Please check email to verify account.",
    });
  } catch (error) {
    getError(error, res);
  }
};
const login = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const { email, password, rememberMe } = req.body;

    const customer = await Customer.findOne({
      where: { email },
    });

    if (!customer) throw new Error("User Not Registered");
    if (customer.blocked) throw new Error(`Customer Blocked`);
    const tenant = customer.tenantName.replace(/[^a-zA-Z0-9 ]/g, "");
    await db.sequelize.query(`use ${tenant}`).catch(() => {
      throw new Error("Email Not Verified");
    });

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: UserRole,
          attributes: ["roleId"],
          include: [
            {
              model: Role,
              attributes: ["name"],
            },
            {
              model: Permission,
              attributes: ["name", "view", "add", "edit", "delete"],
            },
          ],
        },
      ],
    });

    if (!user.active) throw new Error("User Inactive");
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) throw new Error("Incorrect Password");

    const { id, name, verifiedAt } = user;
    if (!verifiedAt) throw new Error("Email Not Verified");

    let allPermissions = [];
    const newRoles = await user.userRoles.map((el) => {
      allPermissions = [...allPermissions, ...el.permissions];
      let tempRole = {};
      tempRole.name = el.role.name;
      tempRole.permissions = el.permissions;
      return tempRole;
    });

    let customerAdmin = email == customer.tenantName;
    let tokenData = { id, email, tenant: customer.tenantName };
    const accessToken = await createToken(
      { ...tokenData, customerAdmin, permissions: allPermissions },
      process.env.JWT_ACCESS_SECRET,
      rememberMe
        ? process.env.JWT_ACCESS_REMEMBER_EXPIRATION
        : process.env.JWT_ACCESS_EXPIRATION
    );
    const refreshToken = await createToken(
      tokenData,
      process.env.JWT_REFRESH_SECRET,
      rememberMe
        ? process.env.JWT_REFRESH_REMEMBER_EXPIRATION
        : process.env.JWT_REFRESH_EXPIRATION
    );

    return res.status(200).json({
      id,
      name,
      email,
      customerAdmin,
      roles: newRoles,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    getError(error, res);
  }
};

const verifyCustomer = async (req, res) => {
  try {
    const data = verify(req.params.token, process.env.JWT_VERIFICATION_SECRET);
    if (data) {
      const { email } = data;
      const unverifiedUser = await Unverified.findOne({
        where: { email },
      });

      if (unverifiedUser) {
        Unverified.destroy({
          where: {
            email,
          },
        });
        const { name, password } = unverifiedUser;
        const database = await email.replace(/[^a-zA-Z0-9 ]/g, "");

        await db.sequelize.query(`create DATABASE ${database}`).catch(() => {
          throw new Error("CustomerDatabase already exist");
        });

        await db.sequelize.query(`use ${database}`);
        await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

        await User.sync({ force: false, alter: true });

        await UserRole.sync({ force: false, alter: true });
        await Permission.sync({ force: false, alter: true });
        await Role.sync({ force: false, alter: true });
        await User.create({
          name,
          email,
          password: password,
          verifiedAt: new Date(),
        });
        await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
        return res
          .status(200)
          .json({ message: "Email Verification Successfull" });
      } else {
        throw new Error("Customer Email Already Verified");
      }
    }
  } catch (error) {
    getError(error, res, "Email Verification");
  }
};

const verifyUser = async (req, res) => {
  try {
    const data = verify(req.params.token, process.env.JWT_VERIFICATION_SECRET);
    if (data) {
      const { email, tenant } = data;

      await db.sequelize.query(`use ${tenant}`);
      const user = await User.findOne({
        where: { email },
      });

      if (user) {
        if (user.verifiedAt) throw new Error("Email Already Verified");
        await User.update(
          { verifiedAt: new Date() },
          {
            where: {
              email: data.email,
            },
          }
        );
        return res
          .status(200)
          .json({ message: "Email Verification Successfull" });
      } else {
        throw new Error("User not found");
      }
    }
  } catch (error) {
    getError(error, res, "Email Verification");
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = verify(req.params.token, process.env.JWT_RESET_SECRET);
    if (data) {
      const { email, tenant } = data;
      await db.sequelize.query(`use ${tenant}`);
      const hash = await bcrypt.hash(req.body.password, 8);

      const updatedUser = await User.update(
        { password: hash },
        {
          where: {
            email: email,
          },
        }
      );
      if (updatedUser[0])
        return res.status(200).json({ message: "Password Reset Successfull" });
      else throw new Error("User Not Registered");
    }
  } catch (error) {
    getError(error, res, "Password Reset");
  }
};
const sendResetPasswordMail = async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({
      where: { email },
    });
    if (!customer) throw new Error("User Not Registered");
    let database = customer.tenantName.replace(/[^a-zA-Z0-9 ]/g, "");
    await db.sequelize.query(`use ${database}`);
    const user = await User.findOne({
      where: { email },
    });
    sendMail({ email, name: user.name, tenant: database }, "reset-password");
    return res.status(200).json({ message: "Password rest mail sent." });
  } catch (error) {
    getError(error, res);
  }
};

export {
  login,
  register,
  verifyCustomer,
  verifyUser,
  resetPassword,
  sendResetPasswordMail,
};
