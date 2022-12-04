import db from "../Utils/dataBaseConnection.js";
import getError from "../Utils/sequelizeError.js";
import {
  projectByIdValidation,
  addProjectValidation,
  memberProjectValidation,
  updateProjectValidation,
} from "../Utils/Validations/project.js";
import { userIdValidation } from "../Utils/Validations/user.js";

const UserProject = db.userProjects;
const Project = db.projects;
const User = db.users;
const TestCase = db.testCases;
const ReusableProcess = db.reusableProcess;
const Object = db.objects;
const getMyProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
      #swagger.security = [{"apiKeyAuth": []}] */
  try {
    const userId = req.user.id;
    const { error } = userIdValidation.validate({ userId });
    if (error) throw new Error(error.details[0].message);

    const projects = await UserProject.schema(req.database).findAll({
      where: { userId },
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
                  attributes: ["id", "name", "email", "active", "profileImage"],
                },
              ],
            },
            {
              model: User.schema(req.database),
              as: "createdBy",
              attributes: ["id", "name", "email", "active", "profileImage"],
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
    const { error } = projectByIdValidation.validate({ projectId });
    if (error) throw new Error(error.details[0].message);

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
              attributes: ["id", "name", "email", "active", "verifiedAt"],
            },
          ],
        },
        {
          model: User.schema(req.database),
          as: "createdBy",
          attributes: ["id", "name", "email", "active", "profileImage"],
        },
      ],
    });

    let temp = { ...project.dataValues };

    temp.members = temp.members.map((user) => {
      return user.dataValues.user;
    });

    const testCase = await TestCase.schema(req.database).count({
      where: { projectId },
    });
    const reusableProcess = await ReusableProcess.schema(req.database).count({
      where: { projectId },
    });
    const object = await Object.schema(req.database).count({
      where: { projectId },
    });

    return res
      .status(200)
      .json({ ...temp, count: { testCase, reusableProcess, object } });
  } catch (error) {
    getError(error, res);
  }
};

const addProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const { name, description, startDate, endDate } = req.body;

    const { error } = addProjectValidation.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const project = await Project.schema(req.database).create({
      name,
      description,
      startDate,
      endDate,
      createdByUser: req.user.id,
    });

    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
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
    const { error } = projectByIdValidation.validate({ projectId });
    if (error) throw new Error(error.details[0].message);

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
    const { projectId, userId } = req.body;
    const { error } = memberProjectValidation.validate({ projectId, userId });
    if (error) throw new Error(error.details[0].message);
    await db.sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    const userProject = await UserProject.schema(req.database).findOne({
      where: { userId: req.user.id, projectId },
    });
    if (!userProject) return res.status(401).json({ error: "Unauthorized" });

    await UserProject.schema(req.database).create({
      userId: userId,
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

    const { error } = memberProjectValidation.validate({
      projectId,
      userId,
    });
    if (error) throw new Error(error.details[0].message);
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

const editProject = async (req, res) => {
  /*  #swagger.tags = ["Project"] 
     #swagger.security = [{"apiKeyAuth": []}]
  */
  try {
    const projectId = req.headers["x-project-id"];

    const { error } = updateProjectValidation.validate({
      ...req.body,
      projectId,
    });
    if (error) throw new Error(error.details[0].message);

    const updatedProject = await Project.schema(req.database).update(req.body, {
      where: {
        id: projectId,
      },
    });

    if (updatedProject[0]) {
      return res.status(200).json({ message: "Project Updated Successfully!" });
    } else {
      return res.status(400).json({ error: "Record not found" });
    }
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
  editProject,
};
