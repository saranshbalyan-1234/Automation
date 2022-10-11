module.exports = (sequelize, DataTypes) => {
  const Tracking = sequelize.define("trackings", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      validate: {
        notNull: true,
      },
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,

      validate: {
        notNull: true,
      },
    },
  });

  return Tracking;
};
