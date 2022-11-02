module.exports = (sequelize, DataTypes) => {
  const TestStep = sequelize.define("testSteps", {
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
    objectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "objects",
        key: "id",
      },
    },
    screenshot: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
    processId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   notNull: true,
      // },
      references: {
        model: "processes",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    reusableFlowId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // validate: {
      //   notNull: true,
      // },
      references: {
        model: "reusableFlows",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  return TestStep;
};
