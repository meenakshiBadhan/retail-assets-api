const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const ExpectedDevice = sequelize.define(
  "ExpectedDevice",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Stores",
        key: "id",
      },
    },
    deviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "DeviceTypes",
        key: "id",
      },
    },
    expectedQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { tableName: "expectedDevices" }
);

module.exports = ExpectedDevice;
