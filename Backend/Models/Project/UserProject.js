export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define("userProjects", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "projects",
        key: "id",
      },
    },
  });

  return UserProject;
};
