import db from "../../Utils/dataBaseConnection.js";
import getError from "../../Utils/sequelizeError.js";

const TestProcess = db.testProcess;

const saveTestProcess = async (req, res) => {
  /*  #swagger.tags = ["Test Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    // const { error } = nameValidation.validate(req.body);
    // if (error) throw new Error(error.details[0].message);

    const data = await TestProcess.schema(req.database).create(req.body);
    return res.status(200).json(data);
  } catch (err) {
    getError(err, res);
  }
};

const updateTestProcess = async (req, res) => {
  /*  #swagger.tags = ["Test Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testProcessId = req.params.testProcessId;
    // const { error } = updateTestCaseValidation.validate({ name, testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const updatedTestProcess = await TestProcess.schema(req.database).update(
      req.body,
      {
        where: {
          id: testProcessId,
        },
      }
    );

    if (updatedTestProcess[0]) {
      return res
        .status(200)
        .json({ message: "TestProcess updated successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

const deleteTestProcess = async (req, res) => {
  /*  #swagger.tags = ["Test Process"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */

  try {
    const testProcessId = req.params.testProcessId;
    // const { error } = testCaseIdValidation.validate({ testCaseId });
    // if (error) throw new Error(error.details[0].message);

    const deletedTestProcess = await TestProcess.schema(req.database).destroy({
      where: { id: testProcessId },
    });

    if (deletedTestProcess > 0) {
      return res
        .status(200)
        .json({ message: "TestProcess deleted successfully" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
  } catch (err) {
    getError(err, res);
  }
};

export { saveTestProcess, updateTestProcess, deleteTestProcess };
