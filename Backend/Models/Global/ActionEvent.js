export default (sequelize, DataTypes) => {
  const ActionEvent = sequelize.define(
    "actionevents",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      object: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        values: [0, 1],
        allowNull: false,
      },
      parameter1: {
        type: DataTypes.STRING,
      },
      parameter2: {
        type: DataTypes.STRING,
      },
      parameter3: {
        type: DataTypes.STRING,
      },
      parameter4: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

  return ActionEvent;
};
