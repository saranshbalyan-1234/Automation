import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";

const TestParameter = db.testParameters;

const saveTestParameter = async (req, res) => {
  /*  #swagger.tags = ["Test Parameter"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);

    const data = await TestParameter.schema(req.database).create(req.body);
    return res.status(200).json(data);
  } catch (err) {
    getError(err, res);
  }
};

export { saveTestParameter };
