export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define("userProjects", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return UserProject;
};
