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
    const projectId = req.params.projectId;
    const userProject = await UserProject.schema(req.database).findOne({
      where: { userId: req.user.id, projectId },
    });

    if (!userProject) return res.status(401).json({ error: "Unauthorized" });

    const project = await Project.schema(req.database).findByPk(projectId, {
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

const deleteProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const projectId = req.params.projectId;
    const userProject = await UserProject.schema(req.database).findOne({
      where: { userId: req.user.id, projectId },
    });
    if (!userProject) return res.status(401).json({ error: "Unauthorized" });
    await User.schema(req.database).update(
      { defaultProjectId: null },
      {
        where: {
          defaultProjectId: projectId,
        },
      }
    );
    await UserProject.schema(req.database).destroy({ where: { projectId } });
    const deletedProject = await Project.schema(req.database).destroy({
      where: { id: projectId },
    });
    if (deletedProject > 0)
      return res.status(200).json({ message: "Project deleted successfully!" });
    else return res.status(400).json({ error: "Project not found!" });
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

    await UserProject.schema(req.database).create({
      userId: req.user.id,
      projectId: projectId,
    });
    return res.status(200).json({ message: "Project member added!" });
  } catch (error) {
    getError(error, res);
  }
};

const deleteMember = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { projectId, userId } = req.body;
    const userProject = await UserProject.schema(req.database).findOne({
      where: { userId: req.user.id, projectId },
    });
    if (!userProject) return res.status(401).json({ error: "Unauthorized" });

    await User.schema(req.database).update(
      { defaultProjectId: null },
      {
        where: {
          defaultProjectId: projectId,
          id: userId,
        },
      }
    );
    await UserProject.schema(req.database).destroy({
      where: { userId: userId, projectId: projectId },
    });

    return res.status(200).json({ message: "Project member removed!" });
  } catch (error) {
    getError(error, res);
  }
};

export {
  getMyProject,
  getProjectById,
  addProject,
  deleteProject,
  addMember,
  deleteMember,
};
