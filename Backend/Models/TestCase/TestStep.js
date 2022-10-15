export default (sequelize, DataTypes) => {
  const TestCase = sequelize.define("teststeps", {
    actionEvent: {
      type: DataTypes.STRING,
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
    testCaseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "testcases",
        key: "id",
      },
    },
  });

  return TestCase;
};
