module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("customers", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: true,
      },
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
      values: [0, 1],
    },

    tenantName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "tenants",
        key: "name",
      },
      validate: {
        notNull: true,
      },
    },
  });

  return Customer;
};
