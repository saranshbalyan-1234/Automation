import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
import axios from "axios";
import { idValidation } from "../Utils/Validations/index.js";
const Machine = db.machines;

export const addMachine = async (req, res) => {
  /*  #swagger.tags = ["Machine"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    if (!req.user.customerAdmin)
      return res
        .status(401)
        .json({ error: "Only CustomerAdmin can add machines!" });

    const { name, url } = req.body;
    let payload = {
      bots: 1,
      continueOnError: false,
      name: "fsa",
      recordAllSteps: false,
    };
    return axios
      .post(`http://localhost:3002/execute/null`, payload, {
        headers: {
          Authorization: req.headers.authorization,
        },
      })
      .catch(async (err) => {
        const error = err.response?.data?.error;
        if (error == "TestCase Id must be Integer") {
          const machine = await Machine.schema(req.database).create({
            name,
            url,
          });
          return res.status(200).json(machine);
        } else
          return res.status(400).json({ error: "Not a verified machine!" });
      });
  } catch (error) {
    getError(error, res);
  }
};

export const getAllMachine = async (req, res) => {
  /*  #swagger.tags = ["Machine"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const machines = await Machine.schema(req.database).findAll({
      attributes: ["id", "name", "url", "createdAt"],
    });

    return res.status(200).json(machines);
  } catch (error) {
    getError(error, res);
  }
};

export const removeMachine = async (req, res) => {
  /*  #swagger.tags = ["Machine"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    if (!req.user.customerAdmin)
      return res
        .status(401)
        .json({ error: "Only CustomerAdmin can remove machines!" });
    const machineId = req.params.machineId;
    const { error } = idValidation.validate({ id: machineId });
    if (error) throw new Error(error.details[0].message);

    const deletedMachine = await Machine.schema(req.database).destroy({
      where: { id: machineId },
    });
    if (deletedMachine > 0)
      return res.status(200).json({ message: "Machine deleted successfully!" });
    else return res.status(400).json({ error: "Machine not found!" });
  } catch (error) {
    getError(error, res);
  }
};
