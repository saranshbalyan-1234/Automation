export default (sequelize, DataTypes) => {
  const TestParameter = sequelize.define("testParameters", {
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
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "teststeps",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  return TestParameter;
};
