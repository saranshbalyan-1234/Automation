export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define("userRoles", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "users",
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "roles",
        key: "id",
      },
    },
  });

  return UserRole;
};
