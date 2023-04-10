export default (sequelize, DataTypes) => {
  const Machine = sequelize.define("machines", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "name",
      validate: {
        notNull: true,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "url",
      validate: {
        notNull: true,
      },
    },
  });

  return Machine;
};
