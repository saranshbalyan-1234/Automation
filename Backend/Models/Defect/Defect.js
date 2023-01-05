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
      type: DataTypes.STRING,
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
