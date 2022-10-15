export default (sequelize, DataTypes) => {
  const Locators = sequelize.define("locators", {
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
    testObjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "testobjects",
        key: "id",
      },
    },
  });

  return Locators;
};
