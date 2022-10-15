export default (sequelize, DataTypes) => {
  const TestObject = sequelize.define("testobjects", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "projects",
        key: "id",
      },
    },
  });

  return TestObject;
};
