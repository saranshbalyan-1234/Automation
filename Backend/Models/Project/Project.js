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
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    createdByUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  Project.hasOne(sequelize.models.users, {
    foreignKey: {
      name: "id",
      allowNull: false,
    },
    sourceKey: "createdByUser",
    onDelete: "CASCADE",
  });

  return Project;
};
