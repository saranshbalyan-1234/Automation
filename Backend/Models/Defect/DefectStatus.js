export default (sequelize, DataTypes) => {
  const DefectStatus = sequelize.define(
    "defectStatus",
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

  return DefectStatus;
};
