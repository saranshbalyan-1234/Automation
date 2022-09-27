module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("permissions", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
      },
    },

    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
      validate: {
        notNull: true,
      },
    },
    view: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
    add: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
    edit: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
    delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
  });

  return Permission;
};
