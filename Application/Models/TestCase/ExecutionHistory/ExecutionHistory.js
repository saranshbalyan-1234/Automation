module.exports = (sequelize, DataTypes) => {
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
    result: {
      type: DataTypes.BOOLEAN,
      values: [0, 1],
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return ExecutionHistory;
};
