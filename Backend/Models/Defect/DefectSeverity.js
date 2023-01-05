export default (sequelize, DataTypes) => {
  const DefectPriority = sequelize.define(
    "defectSeverities",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "name",
        validate: {
          notNull: true,
        },
      },
    },
    { timestamps: false }
  );

  return DefectPriority;
};
