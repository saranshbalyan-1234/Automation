module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define("userRoles", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "roles",
        key: "id",
      },
    },
  });

  UserRole.hasMany(sequelize.models.permissions, {
    foreignKey: "roleId",
  });
  UserRole.hasOne(sequelize.models.roles, {
    foreignKey: "id",
  });

  return UserRole;
};
