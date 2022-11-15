export default (sequelize, DataTypes) => {
  const ProcessHistory = sequelize.define("processHistories", {
    processId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    step: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    reusableProcess: {
      type: DataTypes.JSON,
      defaultValue: null,
    },
    executionHistoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "executionHistories",
        key: "id",
      },
    },
    result: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },
  });

  return ProcessHistory;
};
