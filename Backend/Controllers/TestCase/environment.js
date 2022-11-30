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

    return res.status(200).json({ message: "Environment Created!" });
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

export {
  saveEnvironment,
  getAllEnvironmentsByTestCase,
  createColumnForEnvironment,
};
