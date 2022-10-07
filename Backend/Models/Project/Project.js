export default (sequelize, DataTypes) => {
  const Project = sequelize.define("projects", {
    name: {
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
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    createdByUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "RESTRICT",
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  return Project;
};
