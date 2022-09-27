module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define("tenants", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
  });

  return Tenant;
};
