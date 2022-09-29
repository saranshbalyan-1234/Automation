export default (sequelize, DataTypes) => {
  const Tenant = sequelize.define("tenants", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "name",
      validate: {
        notNull: true,
      },
    },
  });

  return Tenant;
};
