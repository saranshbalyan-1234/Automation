export default (sequelize, DataTypes) => {
  const DefectPriority = sequelize.define(
    "defectPriorities",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "name",
        validate: {
          notNull: true,
        },
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      step: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: "step",
        validate: {
          notNull: true,
        },
      },
    },
    { timestamps: false }
  );

  return DefectPriority;
};
