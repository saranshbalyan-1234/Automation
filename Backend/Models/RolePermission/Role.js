export default (sequelize, DataTypes) => {
  const Role = sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "name",
      validate: {
        notNull: true,
      },
    },
  });

  Role.hasMany(sequelize.models.permissions, {
    foreignKey: "roleId",
  });

  return Role;
};
