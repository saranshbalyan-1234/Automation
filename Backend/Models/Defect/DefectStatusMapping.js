export default (sequelize, DataTypes) => {
  const DefectStatus = sequelize.define(
    "defectStatusMappings",
    {
      statusId: {
        type: DataTypes.INTEGER,
        references: {
          model: "defectStatuses",
          key: "id",
        },
      },

      parentStatusId: {
        type: DataTypes.INTEGER,
        references: {
          model: "defectStatuses",
          key: "id",
        },
      },
    },
    { timestamps: false }
  );

  return DefectStatus;
};
