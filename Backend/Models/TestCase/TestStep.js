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
    testObjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "testobjects",
        key: "id",
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
  });

  return TestCase;
};
