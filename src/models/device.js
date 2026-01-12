const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Device = sequelize.define(
  "Device",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    deviceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "DeviceTypes",
        key: "id",
      },
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Stores",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("IN_WAREHOUSE", "ASSIGNED"),
      allowNull: false,
      defaultValue: "IN_WAREHOUSE",
    },
  },
  { tableName: "devices" }
);

Device.associate = (models) => {
  Device.belongsTo(models.DeviceType, {
    foreignKey: "deviceTypeId",
    as: "deviceType",
  });
  Device.belongsTo(models.Store, {
    foreignKey: "storeId",
    as: "store",
  });
};

module.exports = Device;
