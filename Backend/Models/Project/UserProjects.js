export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define("userProject", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "projects",
        key: "id",
      },
    },
  });

  UserProject.hasMany(sequelize.models.projects, {
    foreignKey: "id",
  });

  return UserProject;
};
