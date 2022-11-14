export default (sequelize, DataTypes) => {
  const ProcessHistory = sequelize.define("processHistories", {
    processId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "processes",
        key: "id",
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
  });

  return ProcessHistory;
};
