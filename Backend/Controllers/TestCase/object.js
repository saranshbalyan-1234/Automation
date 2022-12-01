import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import { projectByIdValidation } from "../../Utils/Validations/project.js";
const Object = db.objects;
const User = db.users;
const ObjectLocator = db.ObjectLocators;

const saveObject = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);
    const payload = { ...req.body };
    payload.createdByUser = req.user.id;

    const object = await Object.schema(req.database).create(payload);

    return res.status(200).json(object);
  } catch (err) {
    getError(err, res);
  }
};
const getObjectDetailsById = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const objectId = req.params.objectId;
    // const { error } = projectByIdValidation.validate({ projectId });
    // if (error) throw new Error(error.details[0].message);

    const testCase = await Object.schema(req.database).findOne({
      where: {
        id: objectId,
      },
      attributes: [
        "id",
        "name",
        "createdAt",
        "updatedAt",
        "description",
        "tags",
      ],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active", "profileImage"],
        },
        {
          model: ObjectLocator.schema(req.database),
          as: "locators",
        },
      ],
    });

    return res.status(200).json(testCase);
  } catch (err) {
    getError(err, res);
  }
};

const updateObject = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const objectId = req.params.objectId;
    // const { error } = updateTestCaseValidation.validate({ name, testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const updatedObject = await Object.schema(req.database).update(req.body, {
      where: {
        id: objectId,
      },
    });

    if (updatedObject[0]) {
      return res.status(200).json({ message: "Object updated successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const deleteObject = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const objectId = req.params.objectId;
    // const { error } = testCaseIdValidation.validate({ testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const deletedObject = await Object.schema(req.database).destroy({
      where: { id: objectId },
    });

    if (deletedObject > 0) {
      return res.status(200).json({ message: "Object deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const getAllObject = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const projectId = req.headers["x-project-id"];
    const { error } = projectByIdValidation.validate({ projectId });
    if (error) throw new Error(error.details[0].message);

    const objects = await Object.schema(req.database).findAll({
      where: {
        projectId,
      },
      attributes: ["id", "name", "createdAt", "updatedAt", "tags"],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active", "profileImage"],
        },
      ],
    });

    return res.status(200).json(objects);
  } catch (err) {
    getError(err, res);
  }
};
const getObjectLocatorsByObjectId = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const objectId = req.params.objectId;
    // const { error } = projectByIdValidation.validate({ projectId });
    // if (error) throw new Error(error.details[0].message);

    const locators = await ObjectLocator.schema(req.database).findAll({
      where: {
        objectId,
      },
    });

    return res.status(200).json(locators);
  } catch (err) {
    getError(err, res);
  }
};

const saveObjectLocator = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);

    const locator = await ObjectLocator.schema(req.database).create(req.body);
    return res.status(200).json(locator);
  } catch (err) {
    getError(err, res);
  }
};

const deleteObjectLocator = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const locatorId = req.params.locatorId;
    // const { error } = testCaseIdValidation.validate({ testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const deletedLocator = await ObjectLocator.schema(req.database).destroy({
      where: { id: locatorId },
    });

    if (deletedLocator > 0) {
      return res
        .status(200)
        .json({ message: "ObjectLocator deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

export {
  getAllObject,
  getObjectDetailsById,
  saveObject,
  updateObject,
  deleteObject,
  getObjectLocatorsByObjectId,
  saveObjectLocator,
  deleteObjectLocator,
};
