export default (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        notNull: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },

    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      values: [0, 1],
    },
    defaultProjectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      default: null,
      onDelete: "SET NULL",
      references: {
        model: "projects",
        key: "id",
      },
    },
  });

  User.hasMany(sequelize.models.userRoles, {
    foreignKey: "userId",
  });
  sequelize.models.roles.hasMany(sequelize.models.permissions, {
    foreignKey: "roleId",
  });

  sequelize.models.userRoles.hasMany(sequelize.models.permissions, {
    foreignKey: "roleId",
  });

  sequelize.models.userRoles.hasOne(sequelize.models.roles, {
    foreignKey: "id",
    sourceKey: "roleId",
  });

  sequelize.models.projects.hasOne(sequelize.models.users, {
    as: "createdBy",
    sourceKey: "createdByUser",
    foreignKey: "id",
  });
  sequelize.models.projects.hasMany(sequelize.models.userProjects, {
    foreignKey: "projectId",
    as: "members",
  });
  sequelize.models.userProjects.hasOne(sequelize.models.projects, {
    foreignKey: "id",
    sourceKey: "projectId",
  });
  sequelize.models.userProjects.hasOne(sequelize.models.users, {
    foreignKey: "id",
    sourceKey: "userId",
  });

  return User;
};
