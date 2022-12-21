import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../Utils/Mail/nodeMailer.js";
import {
  changePasswordValidation,
  changeDetailsValidation,
  activeInactiveValidation,
  resendVerificationMailValidation,
} from "../Utils/Validations/user.js";
import { s3 } from "./awsController.js";
import { idValidation } from "../Utils/Validations/index.js";

import { deleteBucket } from "./awsController.js";
import { registerValidation } from "../Utils/Validations/auth.js";
import { uploadFile } from "./awsController.js";
const User = db.users;
const Customer = db.customers;
const Tenant = db.tenants;
const UserRole = db.userRoles;
const userProject = db.userProjects;
const getTeam = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const team = await User.schema(req.database).findAll({
      attributes: [
        "id",
        "name",
        "email",
        "profileImage",
        "verifiedAt",
        "deletedAt",
        "active",
        "defaultProjectId",
      ],
      paranoid: false,
    });
    const filteredTeam = team.filter((el) => {
      return el.id !== req.user.id;
    });

    const teamWithImages = await filteredTeam.map(async (user) => {
      let base64ProfileImage = "";
      if (user.dataValues.profileImage) {
        try {
          var getParams = {
            Bucket: req.database,
            Key: user.email.replace(/[^a-zA-Z0-9 ]/g, ""),
          };

          const data = await s3.getObject(getParams).promise();

          if (data?.Body) {
            base64ProfileImage = data.Body.toString("base64");
          } else {
            base64ProfileImage = data;
          }
          return {
            ...user.dataValues,
            profileImage: user.dataValues.profileImage
              ? base64ProfileImage
              : "",
          };
        } catch (err) {
          return {
            ...user.dataValues,
            profileImage: "",
          };
        }
      } else
        return {
          ...user.dataValues,
          profileImage: base64ProfileImage,
        };
    });
    Promise.all(teamWithImages).then((data) => {
      return res.status(200).json(data);
    });
  } catch (error) {
    getError(error, res);
  }
};

const addUser = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { name, email, password } = req.body;
    const { error } = registerValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    const database = req.database;

    await Customer.schema("Main")
      .create({ email, tenantName: req.user.tenant })
      .catch((e) => {
        throw new Error("User already exist");
      });

    const hash = await bcrypt.hash(password, 8);
    const user = await User.schema(req.database).create({
      name,
      email,
      password: hash,
      active: false,
    });
    sendMail({ email, name, tenant: database }, "addUser");

    return res.status(200).json({
      id: user.id,
      name,
      email,
      message: "User added, Verify user's email to login",
    });
  } catch (error) {
    getError(error, res);
  }
};

const resentVerificationEmail = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { error } = resendVerificationMailValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const { name, email } = req.body;
    const database = req.database;
    await sendMail({ email, name, tenant: database }, "addUser");

    return res.status(200).json({
      message: "Verification Email Resent!",
    });
  } catch (error) {
    getError(error, res);
  }
};

const deleteUser = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const userId = req.params.userId;

    const { error } = idValidation.validate({ id: userId });
    if (error) throw new Error(error.details[0].message);

    const user = await User.schema(req.database).findByPk(userId);
    if (req.user.tenant == user.email)
      throw new Error("Cannot Delete Customer Admin");
    if (user.verifiedAt)
      throw new Error(
        "Cannot delete Active User, You can only mark them inactive!"
      );
    await userProject.schema(req.database).destroy({ where: { userId } });
    await UserRole.schema(req.database).destroy({ where: { userId } });
    const deletedUser = await User.schema(req.database).destroy({
      where: {
        id: userId,
      },
    });
    if (deletedUser > 0) {
      const deletedCustomerUser = await Customer.schema("Main").destroy({
        where: {
          email: user.email,
        },
      });
      if (deletedCustomerUser > 0) {
        return res.status(200).json({ message: "User Deleted Successfully" });
      }
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    getError(error, res);
  }
};

const deleteCustomerUser = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    if (!req.user.customerAdmin)
      return res
        .status(401)
        .json({ message: "Only customer admin can perform this operation!" });

    const database = req.database;
    await db.sequelize.query(`drop database ${database}`);
    deleteBucket(database);
    await Customer.schema("Main").destroy({
      where: { tenant: req.user.tenant },
    });
    const deletedTenant = await Tenant.schema("Main").destroy({
      where: {
        name: req.user.tenant,
      },
    });
    if (deletedTenant > 0) {
      return res.status(200).json({ message: "Deleted all data!" });
    }
  } catch (error) {
    getError(error, res);
  }
};

const changePassword = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { error } = changePasswordValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);
    const { oldPassword, newPassword } = req.body;

    const user = await User.schema(req.database).findByPk(req.user.id);
    const isAuthenticated = await bcrypt.compare(oldPassword, user.password);
    if (!isAuthenticated)
      return res.status(400).json({ error: "Incorrect Password" });
    const hash = await bcrypt.hash(newPassword, 8);

    const updatedUser = await User.schema(req.database).update(
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
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { error } = changeDetailsValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const updatedUser = await User.schema(req.database).update(req.body, {
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
const uploadProfileImage = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const file = req.files.image;
    if (!file) throw new Error("Inavlid Image");
    const bucketName = req.database;
    const fileName = req.user.email.replace(/[^a-zA-Z0-9 ]/g, "");
    const result = await uploadFile(file, bucketName, fileName);
    if (result) {
      await User.schema(req.database).update(
        { profileImage: true },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      return res.status(200).json({ message: "Profile Image Updated" });
    } else throw new Error("Unable to upload profile image!");
  } catch (error) {
    getError(error, res);
  }
};

const toggleUserActiveInactive = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    let userId = req.params.userId;
    let active = req.body.active;
    const { error } = activeInactiveValidation.validate({
      userId,
      active,
    });
    if (error) throw new Error(error.details[0].message);

    const updatedUser = await User.schema(req.database).update(req.body, {
      where: {
        id: userId,
      },
    });
    if (updatedUser[0])
      return res
        .status(200)
        .json({ message: `Marked User as ${active ? "Active" : "Inactive"}` });
    else throw new Error("User Not Registered");
  } catch (error) {
    getError(error, res);
  }
};

const myStatus = async (req, res) => {
  /*  #swagger.tags = ["User"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const user = await User.schema(req.database).findOne({
      where: { email: req.user.email },
    });
    if (!user.active)
      return res
        .status(403)
        .json({ error: "Account Inactive, Please Contact Your Admin!" });
    const customer = await Customer.schema("Main").findOne({
      where: { email: req.user.email },
    });

    if (customer.blocked)
      return res.status(403).json({ error: "Account Blocked!" });

    return res.status(200).json("Active");
  } catch (error) {
    getError(error, res);
  }
};

export {
  addUser,
  deleteUser,
  changePassword,
  changeDetails,
  getTeam,
  toggleUserActiveInactive,
  resentVerificationEmail,
  deleteCustomerUser,
  uploadProfileImage,
  myStatus,
};
