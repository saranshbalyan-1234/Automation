module.exports = (sequelize, DataTypes) => {
  const TestStepHistory = sequelize.define("testStepHistories", {
    testStepId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "testSteps",
        key: "id",
      },
    },
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
    object: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    testParameters: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    screenshot: {
      type: DataTypes.STRING,
      defaultValue: 0,
      values: [0, 1],
    },
    processId: {
      type: DataTypes.INTEGER,
      references: {
        model: "processHistories",
        key: "id",
      },
    },
    reusableProcessId: {
      type: DataTypes.INTEGER,
      references: {
        model: "reusableProcessHistories",
        key: "id",
      },
    },
  });
  return TestStepHistory;
};
