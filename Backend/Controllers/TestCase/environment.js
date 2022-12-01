import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";
import { nameValidation } from "../../Utils/Validations/index.js";
const Environment = db.enviroments;
const Column = db.columns;

const saveEnvironment = async (req, res) => {
  /*  #swagger.tags = ["Environment Table"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);
    const payload = { ...req.body };
    const env = await Environment.schema(req.database).create(payload);

    const enviroment = await Environment.schema(req.database).findOne({
      where: {
        testCaseId: payload.testCaseId,
      },
      attributes: ["id"],
    });
    const columns = await Column.schema(req.database).findAll({
      where: { envId: enviroment.id },
    });
    const columnPayload = columns.map((el) => {
      return { value: null, envId: enviroment.id, name: el.dataValues.name };
    });
    await Column.schema(req.database).bulkCreate(columnPayload);

    return res
      .status(200)
      .json({ ...env.dataValues, message: "Environment Created!" });
  } catch (err) {
    getError(err, res);
  }
};
const getAllEnvironmentsByTestCase = async (req, res) => {
  /*  #swagger.tags = ["Environment"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testCaseId = req.params.testCaseId;
    const enviroments = await Environment.schema(req.database).findAll({
      where: {
        testCaseId,
      },
      attributes: ["id", "name"],
      include: [
        {
          model: Column.schema(req.database),
          // attributes: ["id", "name", "email", "active", "profileImage"],
        },
      ],
    });
    const env = enviroments.map((el) => {
      let temp = el.dataValues.columns;
      let newKeys = {};
      temp.forEach((el) => {
        newKeys[el.name] = el.value;
      });

      return {
        envId: el.dataValues.id,
        Environment: el.dataValues.name,
        ...newKeys,
      };
    });
    return res.status(200).json(env);
  } catch (err) {
    getError(err, res);
  }
};
const getAllEnvironmentNamesByTestCase = async (req, res) => {
  /*  #swagger.tags = ["Environment"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testCaseId = req.params.testCaseId;
    const enviroments = await Environment.schema(req.database).findAll({
      where: {
        testCaseId,
      },
      attributes: ["id", "name"],
    });
    return res.status(200).json(enviroments);
  } catch (err) {
    getError(err, res);
  }
};

const createColumnForEnvironment = async (req, res) => {
  /*  #swagger.tags = ["Environment Table"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const columnName = req.body.name;
    const testCaseId = req.params.testCaseId;
    const enviroments = await Environment.schema(req.database).findAll({
      where: {
        testCaseId,
      },
      attributes: ["id"],
    });

    let payload = enviroments.map((el) => {
      let envId = el.dataValues.id;
      return { envId, name: columnName, value: null };
    });
    await Column.schema(req.database).bulkCreate(payload);

    return res.status(200).json({ message: "Column Created!" });
  } catch (err) {
    getError(err, res);
  }
};
const updateColumnValue = async (req, res) => {
  /*  #swagger.tags = ["Environment Table"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const { value, envId, name } = req.body;

    const updateColumnValue = await Column.schema(req.database).update(
      { value },
      {
        where: {
          envId,
          name,
        },
      }
    );
    if (updateColumnValue[0]) {
      return res.status(200).json({ message: "Column updated successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

export {
  saveEnvironment,
  getAllEnvironmentsByTestCase,
  createColumnForEnvironment,
  updateColumnValue,
  getAllEnvironmentNamesByTestCase,
};
