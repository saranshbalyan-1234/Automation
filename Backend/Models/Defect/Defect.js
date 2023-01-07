export default (sequelize, DataTypes) => {
  const Defect = sequelize.define("defects", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "projects",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: null,
    },

    assigneeId: {
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
    reporterId: {
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
    priorityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "defectPriorities",
        key: "id",
      },
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "defectStatuses",
        key: "id",
      },
    },
    severityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "defectSeverities",
        key: "id",
      },
    },
    estimatedTime: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Defect;
};
