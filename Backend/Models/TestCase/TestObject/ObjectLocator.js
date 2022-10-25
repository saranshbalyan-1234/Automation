export default (sequelize, DataTypes) => {
  const ObjectLocator = sequelize.define("objectLocators", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    locator: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },

    testObjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "testObjects",
        key: "id",
      },
    },
  });

  return ObjectLocator;
};
