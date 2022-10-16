export default (sequelize, DataTypes) => {
  const TestCase = sequelize.define("testCases", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "projects",
        key: "id",
      },
    },
    createdByUser: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  return TestCase;
};
