const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const DeviceType = sequelize.define(
  "DeviceType",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { tableName: "deviceTypes" }
);

module.exports = DeviceType;
