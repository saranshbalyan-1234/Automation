module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
  });

  return Role;
};
