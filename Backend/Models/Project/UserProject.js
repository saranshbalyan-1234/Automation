export default (sequelize, DataTypes) => {
  const UserProject = sequelize.define(
    "userProjects",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
        references: {
          model: "user",
          key: "id",
        },
      },
      projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
        },
        references: {
          model: "projects",
          key: "id",
        },
      },
    },
    { paranoid: true }
  );

  return UserProject;
};
