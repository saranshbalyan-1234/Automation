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

const updateTestParameter = async (req, res) => {
  /*  #swagger.tags = ["Test Parameter"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testParameterId = req.params.testParameterId;
    // const { error } = updateTestCaseValidation.validate({ name, testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const updatedTestParameter = await TestParameter.schema(
      req.database
    ).update(req.body, {
      where: {
        id: testParameterId,
      },
    });

    if (updatedTestParameter[0]) {
      return res
        .status(200)
        .json({ message: "TestParameter updated successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const deleteTestParameter = async (req, res) => {
  /*  #swagger.tags = ["Test Parameter"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testParameterId = req.params.testParameterId;
    // const { error } = testCaseIdValidation.validate({ testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const deletedTestParameter = await TestParameter.schema(
      req.database
    ).destroy({
      where: { id: testParameterId },
    });

    if (deletedTestParameter > 0) {
      return res
        .status(200)
        .json({ message: "TestParameter deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

export { saveTestParameter, updateTestParameter, deleteTestParameter };
