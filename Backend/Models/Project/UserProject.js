export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define("userProjects", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "RESTRICT",
      references: {
        model: "user",
        key: "id",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "CASCADE",
      references: {
        model: "projects",
        key: "id",
      },
    },
  });

  return UserProject;
};
