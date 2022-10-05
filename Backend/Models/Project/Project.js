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
      onDelete: "CASCADE",
      references: {
        model: "users",
        key: "id",
      },
    },
  });

  Project.hasOne(sequelize.models.users, {
    as: "createdBy",
    sourceKey: "createdByUser",
    foreignKey: "id",
    onDelete: "CASCADE",
    // as: "createdBy",
  });
  Project.hasMany(sequelize.models.userProjects, {
    foreignKey: "projectId",
    as: "members",
  });
  sequelize.models.userProjects.hasOne(Project, {
    foreignKey: "id",
    sourceKey: "projectId",
    onDelete: "CASCADE",
  });
  sequelize.models.userProjects.hasOne(sequelize.models.users, {
    foreignKey: "id",

    sourceKey: "userId",
    onDelete: "CASCADE",
  });
  return Project;
};
