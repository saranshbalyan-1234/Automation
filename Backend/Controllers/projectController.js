import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const UserProject = db.userProjects;
const Project = db.projects;
const User = db.users;
const getMyProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
      #swagger.security = [{"apiKeyAuth": []}] */
  try {
    const projects = await UserProject.findAll({
      where: { userId: req.user.id },
      attributes: ["id"],
      include: [
        {
          model: Project,
          attributes: ["id", "name"],
        },
      ],
    });

    const updatedArray = projects.map((el) => {
      let temp = {};
      temp.id = el.project.id;
      temp.name = el.project.name;
      return temp;
    });
    return res.status(200).json(updatedArray);
  } catch (error) {
    getError(error, res);
  }
};

const getProjectUsers = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const projects = await UserProject.findAll({
      where: { projectId: req.params.id },
      attributes: ["id"],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    const updatedArray = projects.map((el) => {
      let temp = {};
      temp.id = el.user.id;
      temp.name = el.user.name;
      temp.email = el.user.email;
      temp.active = el.user.active;
      return temp;
    });
    return res.status(200).json(updatedArray);
  } catch (error) {
    getError(error, res);
  }
};

const allProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const projects = await Project.findAll({
      attributes: ["id", "name"],
    });

    return res.status(200).json(projects);
  } catch (error) {
    getError(error, res);
  }
};
const getProjectById = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const project = await Project.findOne({
      attributes: ["id", "name"],
    });

    return res.status(200).json(project);
  } catch (error) {
    getError(error, res);
  }
};

const createProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { name, startDate, endDate } = req.body;
    const project = await Project.create({
      name,
      startDate,
      endDate,
      createdByUser: req.user.id,
    });

    return res.status(200).json(project);
  } catch (error) {
    getError(error, res);
  }
};

export {
  getMyProject,
  allProject,
  getProjectUsers,
  getProjectById,
  createProject,
};
