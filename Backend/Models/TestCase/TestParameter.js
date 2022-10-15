export default (sequelize, DataTypes) => {
  const TestParameter = sequelize.define("testparameters", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    property: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    testStepId: {
      type: DataTypes.INTEGER,
      references: {
        model: "teststeps",
        key: "id",
      },
    },
  });

  return TestParameter;
};
