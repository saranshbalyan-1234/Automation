import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";

const TestObject = db.testObjects;

const saveTestObject = async (req, res) => {
  /*  #swagger.tags = ["Test Object"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);

    const data = await TestObject.schema(req.database).create(req.body);
    return res.status(200).json(data);
  } catch (err) {
    getError(err, res);
  }
};

export { saveTestObject };
