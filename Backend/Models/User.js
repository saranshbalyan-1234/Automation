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
    },
  });

  sequelize.models.users.hasMany(sequelize.models.userRoles, {
    foreignKey: "userId",
    constraints: false,
  });
  sequelize.models.roles.hasMany(sequelize.models.permissions, {
    foreignKey: "roleId",
    constraints: false,
  });

  sequelize.models.userRoles.hasMany(sequelize.models.permissions, {
    foreignKey: "roleId",
    constraints: false,
  });

  sequelize.models.userRoles.hasOne(sequelize.models.roles, {
    foreignKey: "id",
    sourceKey: "roleId",
    constraints: false,
  });

  sequelize.models.projects.hasOne(sequelize.models.users, {
    as: "createdBy",
    sourceKey: "createdByUser",
    foreignKey: "id",
    constraints: false,
  });
  sequelize.models.testObjects.hasOne(sequelize.models.users, {
    as: "createdBy",
    sourceKey: "createdByUser",
    foreignKey: "id",
    constraints: false,
  });

  sequelize.models.testObjects.hasMany(sequelize.models.objectLocators, {
    foreignKey: "testObjectId",
    as: "locators",
    constraints: false,
  });

  sequelize.models.projects.hasMany(sequelize.models.userProjects, {
    foreignKey: "projectId",
    as: "members",
    constraints: false,
  });
  sequelize.models.userProjects.hasOne(sequelize.models.projects, {
    foreignKey: "id",
    sourceKey: "projectId",
    constraints: false,
  });
  sequelize.models.userProjects.hasOne(sequelize.models.users, {
    foreignKey: "id",
    sourceKey: "userId",
    constraints: false,
  });
  sequelize.models.testCases.hasOne(sequelize.models.users, {
    as: "createdBy",
    sourceKey: "createdByUser",
    foreignKey: "id",
    constraints: false,
  });

  sequelize.models.reusableFlows.hasOne(sequelize.models.users, {
    as: "createdBy",
    sourceKey: "createdByUser",
    foreignKey: "id",
    constraints: false,
  });

  sequelize.models.testCases.hasMany(sequelize.models.testProcesses, {
    sourceKey: "id",
    foreignKey: "testCaseId",
    constraints: false,
  });

  sequelize.models.reusableFlows.hasMany(sequelize.models.testSteps, {
    sourceKey: "id",
    foreignKey: "reusableFlowId",
    constraints: false,
  });

  sequelize.models.testProcesses.hasMany(sequelize.models.testSteps, {
    sourceKey: "id",
    foreignKey: "testProcessId",
    constraints: false,
  });

  sequelize.models.testSteps.hasMany(sequelize.models.testParameters, {
    sourceKey: "id",
    foreignKey: "testStepId",
    constraints: false,
  });

  sequelize.models.testSteps.hasOne(sequelize.models.testObjects, {
    sourceKey: "testObjectId",
    foreignKey: "id",
    constraints: false,
  });

  return User;
};
