module.exports = (sequelize, DataTypes) => {
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

  sequelize.models.objects.hasMany(sequelize.models.objectLocators, {
    foreignKey: "objectId",
    as: "locators",
    constraints: false,
  });

  sequelize.models.testCases.hasMany(sequelize.models.processes, {
    sourceKey: "id",
    foreignKey: "testCaseId",
    constraints: false,
  });

  sequelize.models.reusableFlows.hasMany(sequelize.models.testSteps, {
    sourceKey: "id",
    foreignKey: "reusableFlowId",
    constraints: false,
  });

  sequelize.models.processes.hasMany(sequelize.models.testSteps, {
    sourceKey: "id",
    foreignKey: "processId",
    constraints: false,
  });

  sequelize.models.testSteps.hasMany(sequelize.models.testParameters, {
    sourceKey: "id",
    foreignKey: "testStepId",
    constraints: false,
  });

  sequelize.models.testSteps.hasOne(sequelize.models.objects, {
    sourceKey: "objectId",
    foreignKey: "id",
    constraints: false,
  });

  return User;
};
