export default (sequelize, DataTypes) => {
  const ActionEvent = sequelize.define("actionevents", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
  });

  return ActionEvent;
};
