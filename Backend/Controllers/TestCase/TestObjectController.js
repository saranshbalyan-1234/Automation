import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import { projectByIdValidation } from "../../Utils/Validations/project.js";
const TestObject = db.testObjects;
const User = db.users;
const ObjectLocator = db.ObjectLocators;

const saveTestObject = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);
    const payload = { ...req.body };
    payload.createdByUser = req.user.id;

    const testObject = await TestObject.schema(req.database).create(payload);

    return res.status(200).json(testObject);
  } catch (err) {
    getError(err, res);
  }
};
const getTestObjectDetailsById = async (req, res) => {
  /*  #swagger.tags = ["Test Case"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testObjectId = req.params.testObjectId;
    // const { error } = projectByIdValidation.validate({ projectId });
    // if (error) throw new Error(error.details[0].message);

    const testCase = await TestObject.schema(req.database).findOne({
      where: {
        id: testObjectId,
      },
      // attributes: ["id", "name", "createdAt", "updatedAt", "description"],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active"],
        },
        {
          model: ObjectLocator.schema(req.database),
          as: "locators",
          // attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    return res.status(200).json(testCase);
  } catch (err) {
    getError(err, res);
  }
};

const updateTestObject = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testObjectId = req.params.testObjectId;
    // const { error } = updateTestCaseValidation.validate({ name, testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const updatedTestObject = await TestObject.schema(req.database).update(
      req.body,
      {
        where: {
          id: testObjectId,
        },
      }
    );

    if (updatedTestObject[0]) {
      return res
        .status(200)
        .json({ message: "TestObject updated successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const deleteTestObject = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testObjectId = req.params.testObjectId;
    // const { error } = testCaseIdValidation.validate({ testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const deletedTestObject = await TestObject.schema(req.database).destroy({
      where: { id: testObjectId },
    });

    if (deletedTestObject > 0) {
      return res
        .status(200)
        .json({ message: "TestObject deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const getAllTestObject = async (req, res) => {
  /*  #swagger.tags = ["Test Ovject"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const projectId = req.params.projectId;
    const { error } = projectByIdValidation.validate({ projectId });
    if (error) throw new Error(error.details[0].message);

    const testObjects = await TestObject.schema(req.database).findAll({
      where: {
        projectId,
      },
      // attributes: ["id", "name", "updatedAt"],
      include: [
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    return res.status(200).json(testObjects);
  } catch (err) {
    getError(err, res);
  }
};

export {
  getAllTestObject,
  getTestObjectDetailsById,
  saveTestObject,
  updateTestObject,
  deleteTestObject,
};
