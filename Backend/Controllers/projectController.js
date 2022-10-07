import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
const UserProject = db.userProjects;
const Project = db.projects;
const User = db.users;
const getMyProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
      #swagger.security = [{"apiKeyAuth": []}] */
  try {
    const projects = await UserProject.schema(req.database).findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Project.schema(req.database),
          include: [
            {
              model: UserProject.schema(req.database),
              as: "members",
              include: [
                {
                  model: User.schema(req.database),
                  attributes: ["id", "name", "email", "active"],
                },
              ],
            },
            {
              model: User.schema(req.database),
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
    const userProject = await UserProject.schema(req.database).findOne({
      where: { userId: req.user.id, projectId: req.params.id },
    });

    if (!userProject) return res.status(401).json({ error: "Unauthorized" });

    const project = await Project.schema(req.database).findByPk(req.params.id, {
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
          model: UserProject.schema(req.database),
          as: "members",
          include: [
            {
              model: User.schema(req.database),
              attributes: ["id", "name", "email", "active"],
            },
          ],
        },
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active"],
        },
      ],
    });
    let temp = { ...project.dataValues };

    temp.members = temp.members.map((user) => {
      return user.dataValues.user;
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
    const project = await Project.schema(req.database).create({
      name,
      description,
      startDate,
      endDate,
      createdByUser: req.user.id,
    });
    await UserProject.schema(req.database).create({
      userId: req.user.id,
      projectId: project.id,
    });

    return res.status(200).json(project);
  } catch (error) {
    getError(error, res);
  }
};

const addMember = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { projectId } = req.body;

    const userProject = await UserProject.findOne({
      where: { userId: req.user.id, projectId },
    });
    if (!userProject) return res.status(401).json({ error: "Unauthorized" });

    if (projectId) {
      await UserProject.schema(req.database).create({
        userId: req.user.id,
        projectId: projectId,
      });
      return res.status(200).json({ message: "Project member added!" });
    } else {
      return res.status(400).json({ error: "Invalid Project" });
    }
  } catch (error) {
    getError(error, res);
  }
};

const removeMember = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { projectId, userId } = req.body;

    const userProject = await UserProject.schema(req.database).findOne({
      where: { userId: req.user.id, projectId },
    });
    if (!userProject) return res.status(401).json({ error: "Unauthorized" });

    if (projectId && userId) {
      await UserProject.schema(req.database).destroy({
        where: { userId: req.user.id, projectId: projectId },
      });

      return res.status(200).json({ message: "Project member removed!" });
    } else {
      return res
        .status(400)
        .json({ error: `Inavlid ${projectId ? "User" : "Project"}` });
    }
  } catch (error) {
    getError(error, res);
  }
};

export { getMyProject, getProjectById, addProject, addMember, removeMember };
