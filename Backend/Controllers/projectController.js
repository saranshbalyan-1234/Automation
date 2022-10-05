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
      include: [
        {
          model: Project,
          include: [
            {
              model: UserProject,
              as: "members",
              include: [
                {
                  model: User,
                  attributes: ["id", "name", "email", "active"],
                },
              ],
            },
            {
              model: User,
              as: "createdBy",
              attributes: ["id", "name", "email", "active"],
            },
          ],
        },
      ],
    });

    const updatedArray = projects.map((el) => {
      let temp = { ...el.project.dataValues };
      temp.members = temp.members.map((el) => {
        return el.user;
      });
      return temp;
    });

    return res.status(200).json(updatedArray);
  } catch (error) {
    getError(error, res);
  }
};

const getProjectById = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const project = await Project.findByPk(req.params.id, {
      attributes: [
        "id",
        "name",
        "description",
        "startDate",
        "endDate",
        "createdAt",
      ],
      include: [
        {
          model: UserProject,
          as: "members",
          include: [
            {
              model: User,

              attributes: ["id", "name", "email", "active"],
            },
          ],
        },
        {
          model: User,
          as: "createdBy",
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    let temp = { ...project.dataValues };
    temp.members = temp.members.map((user) => {
      return user.user;
    });

    return res.status(200).json(temp);
  } catch (error) {
    getError(error, res);
  }
};

const addProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    const { name, description, startDate, endDate } = req.body;
    const project = await Project.create({
      name,
      description,
      startDate,
      endDate,
      createdByUser: req.user.id,
    });
    await UserProject.create({
      userId: req.user.id,
      projectId: project.id,
    });

    return res.status(200).json(project);
  } catch (error) {
    getError(error, res);
  }
};

export { getMyProject, getProjectById, addProject };
