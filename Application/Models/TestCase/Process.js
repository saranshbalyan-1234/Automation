module.exports = (sequelize, DataTypes) => {
  const Process = sequelize.define("processes", {
    name: {
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
    testCaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "testcases",
        key: "id",
      },
    },
    reusableFlowId: {
      type: DataTypes.INTEGER,
      references: {
        model: "reusableFlows",
        key: "id",
      },
    },
  });

  return Process;
};
