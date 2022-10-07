export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define("userProjects", {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "projects",
        key: "id",
      },
    },
  });

  return UserProject;
};
