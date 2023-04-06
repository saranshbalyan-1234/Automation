export default (sequelize, DataTypes) => {
  const Process = sequelize.define("processes", {
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
    testCaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      },
      references: {
        model: "testCases",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    reusableProcessId: {
      type: DataTypes.INTEGER,
      references: {
        model: "reusableProcesses",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  return Process;
};
