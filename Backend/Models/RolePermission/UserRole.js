export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define("userRoles", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "RESTRICT",
      references: {
        model: "users",
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "RESTRICT",
      references: {
        model: "roles",
        key: "id",
      },
    },
  });

  return UserRole;
};
