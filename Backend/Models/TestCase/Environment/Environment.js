export default (sequelize, DataTypes) => {
  const Environment = sequelize.define("environments", {
    name: {
      type: DataTypes.STRING,
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
      onDelete: "CASCADE",
    },
  });

  return Environment;
};
