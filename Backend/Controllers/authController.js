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
const Project = db.projects;
const UserProject = db.userProjects;

const register = async (req, res) => {
  /*  #swagger.tags = ["Auth"] */
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const { name, email, password } = req.body;

    await Tenant.schema("Main")
      .create({ name: email })
      .catch((e) => {
        throw new Error("Tenant already exist");
      });
    await Customer.schema("Main")
      .create({ email, tenantName: email })
      .catch(() => {
        throw new Error("Customer already exist");
      });
    const hash = await bcrypt.hash(password, 8);
    await Unverified.schema("Main").create({ name, email, password: hash });
    sendMail({ email, name }, "customerRegister");

    return res.status(200).json({
      message: "Registered successfuly, Please check email to verify account.",
    });
  } catch (error) {
    getError(error, res);
  }
};
const login = async (req, res) => {
  /*  #swagger.tags = ["Auth"] */
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const { email, password, rememberMe } = req.body;

    const customer = await Customer.schema("Main").findOne({
      where: { email },
    });

    if (!customer) throw new Error("User Not Registered");
    if (customer.blocked) throw new Error(`Customer Blocked`);
    const tenant = customer.tenantName.replace(/[^a-zA-Z0-9 ]/g, "");
    // await db.sequelize.query(`use ${tenant}`).catch(() => {
    //   throw new Error("Email Not Verified");
    // });

    const user = await User.schema(tenant).findOne({
      where: { email },
      include: [
        {
          model: UserRole.schema(tenant),
          attributes: ["roleId"],
          include: [
            {
              model: Role.schema(tenant),
              attributes: ["name"],
            },
            {
              model: Permission.schema(tenant),
              attributes: ["name", "view", "add", "edit", "delete"],
            },
          ],
        },
      ],
    });

    if (!user.active) throw new Error("User Inactive");
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) throw new Error("Incorrect Password");

    const { id, name, verifiedAt, defaultProjectId } = user;
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
      defaultProjectId,
      roles: newRoles,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    getError(error, res);
  }
};

const verifyCustomer = async (req, res) => {
  /*  #swagger.tags = ["Auth"] */
  try {
    const data = verify(req.params.token, process.env.JWT_VERIFICATION_SECRET);
    if (data) {
      const { email } = data;
      const unverifiedUser = await Unverified.schema("Main").findOne({
        where: { email },
      });

      if (unverifiedUser) {
        Unverified.schema("Main").destroy({
          where: {
            email,
          },
        });
        const { name, password } = unverifiedUser;
        const database = await email.replace(/[^a-zA-Z0-9 ]/g, "");

        await db.sequelize.query(`create DATABASE ${database}`).catch(() => {
          throw new Error("CustomerDatabase already exist");
        });

        await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
        await UserRole.schema(database).sync({ force: true, alter: true });
        await Permission.schema(database).sync({ force: true, alter: true });
        await Role.schema(database).sync({ force: true, alter: true });
        await UserProject.schema(database).sync({ force: true, alter: true });
        await Project.schema(database).sync({ force: true, alter: true });
        await User.schema(database).sync({ force: true, alter: true });

        await User.schema(database).create({
          name,
          email,
          password: password,
          verifiedAt: new Date(),
        });
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
  /*  #swagger.tags = ["Auth"] */
  try {
    const data = verify(req.params.token, process.env.JWT_VERIFICATION_SECRET);
    if (data) {
      const { email, tenant } = data;

      await db.sequelize.query(`use ${tenant}`);
      const user = await User.schema(tenant).findOne({
        where: { email },
      });

      if (user) {
        if (user.verifiedAt) throw new Error("Email Already Verified");
        await User.schema(tenant).update(
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
  /*  #swagger.tags = ["Auth"] */
  try {
    const data = verify(req.params.token, process.env.JWT_RESET_SECRET);
    if (data) {
      const { email, tenant } = data;

      const hash = await bcrypt.hash(req.body.password, 8);

      const updatedUser = await User.schema(tenant).update(
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
  /*  #swagger.tags = ["Auth"] */
  try {
    const { email } = req.body;
    const customer = await Customer.findOne({
      where: { email },
    });
    if (!customer) throw new Error("User Not Registered");
    let database = customer.tenantName.replace(/[^a-zA-Z0-9 ]/g, "");

    const user = await User.schema(database).findOne({
      where: { email },
    });
    sendMail({ email, name: user.name, tenant: database }, "reset-password");
    return res.status(200).json({ message: "Password rest mail sent." });
  } catch (error) {
    getError(error, res);
  }
};

const refreshToken = async (req, res) => {
  /*  #swagger.tags = ["Auth"] */
  const token = req.body.refreshToken;
  if (!token) return res.status(401).json({ error: "Refresh token not found" });

  try {
    const data = verify(token, process.env.JWT_REFRESH_SECRET);
    if (data) {
      let tokenData = { id: data.id, email: data.email };
      const accessToken = await createToken(
        tokenData,
        process.env.JWT_ACCESS_SECRET,
        process.env.JWT_ACCESS_EXPIRATION
      );
      const refreshToken = await createToken(
        tokenData,
        process.env.JWT_REFRESH_SECRET,
        process.env.JWT_REFRESH_EXPIRATION
      );
      return res.status(200).json({ accessToken, refreshToken });
    }
  } catch (e) {
    return res.status(401).json({ error: getTokenError(e, "Refresh") });
  }
};

export {
  login,
  register,
  verifyCustomer,
  verifyUser,
  resetPassword,
  sendResetPasswordMail,
  refreshToken,
};
