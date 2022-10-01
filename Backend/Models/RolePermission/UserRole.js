export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define("userRoles", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "CASCADE",
      references: {
        model: "roles",
        key: "id",
      },
    },
  });

  UserRole.hasMany(sequelize.models.permissions, {
    foreignKey: "roleId",
    onDelete: "CASCADE",
  });
  UserRole.hasOne(sequelize.models.roles, {
    foreignKey: "id",
    onDelete: "CASCADE",
  });

  return UserRole;
};
