export default (sequelize, DataTypes) => {
  const PermissionList = sequelize.define(
    "permissionList",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "name",
        validate: {
          notNull: true,
        },
      },
    },
    { timestamps: false }
  );

  return PermissionList;
};
