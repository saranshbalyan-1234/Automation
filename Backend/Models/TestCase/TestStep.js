export default (sequelize, DataTypes) => {
  const TestCase = sequelize.define("testSteps", {
    actionEvent: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    testObjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "testobjects",
        key: "id",
      },
    },
    testProcessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "testProcesses",
        key: "id",
      },
    },
  });

  return TestCase;
};
