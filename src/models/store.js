const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    storeNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("IN_PREPARATION", "IN_ROLLOUT", "DELIVERED"),
      allowNull: false,
      defaultValue: "IN_PREPARATION",
    },
  },
  { tableName: "stores" }
);

module.exports = Store;
