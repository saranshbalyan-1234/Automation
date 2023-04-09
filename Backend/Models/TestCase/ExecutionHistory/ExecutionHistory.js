export default (sequelize, DataTypes) => {
  const ExecutionHistory = sequelize.define("executionHistory", {
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
    testCaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "testCases",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    executedByUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    result: {
      type: DataTypes.BOOLEAN,
      values: [0, 1],
    },
    complete: {
      type: DataTypes.BOOLEAN,
      values: [0, 1],
      defaultValue: 0,
    },
    continueOnError: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
    headless: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
    recordAllSteps: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
  });

  return ExecutionHistory;
};
