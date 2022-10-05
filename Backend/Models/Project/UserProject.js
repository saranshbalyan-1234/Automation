export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define("userProjects", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "users",
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

  // UserProject.hasOne(sequelize.models.projects, {
  //   foreignKey: "id",
  //   sourceKey: "projectId",
  //   onDelete: "CASCADE",
  // });
  UserProject.hasOne(sequelize.models.users, {
    foreignKey: "id",
    sourceKey: "userId",
    onDelete: "CASCADE",
  });

  return UserProject;
};
