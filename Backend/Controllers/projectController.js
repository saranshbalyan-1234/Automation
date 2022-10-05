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
      // include: [
      //   {
      //     model: Project,
      //     attributes: ["id", "name"],
      //   },
      // ],
    });

    // const updatedArray = projects.map((el) => {
    //   let temp = {};
    //   temp.id = el.project.id;
    //   temp.name = el.project.name;
    //   return temp;
    // });
    return res.status(200).json(projects);
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
          include: [
            {
              model: User,
              attributes: ["id", "name", "email", "active"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    const tempProject = projects.map((el) => {
      let temp = { ...el.dataValues };

      temp.members = temp.userProjects.map((user) => {
        user = user.user;
        delete user.user;
        return user;
      });
      temp.createdBy = temp.user;
      delete temp.user;
      delete temp.userProjects;
      return temp;
    });
    return res.status(200).json(tempProject);
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
          include: [
            {
              model: User,
              attributes: ["id", "name", "email", "active"],
            },
          ],
        },
        {
          model: User,
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });

    let temp = { ...project.dataValues };
    temp.members = temp.userProjects.map((user) => {
      user = user.user;
      delete user.user;
      return user;
    });
    temp.createdBy = temp.user;
    delete temp.user;
    delete temp.userProjects;

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

export { getMyProject, allProject, getProjectById, addProject };
