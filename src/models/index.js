const { sequelize } = require("../config/database");
const Store = require("./store");
const DeviceType = require("./deviceType");
const ExpectedDevice = require("./expectedDevice");
const Device = require("./device");

const models = { Store, DeviceType, ExpectedDevice, Device };

Store.hasMany(ExpectedDevice, { foreignKey: "storeId", as: "expectedDevices" });
Store.hasMany(Device, { foreignKey: "storeId", as: "devices" });

DeviceType.hasMany(ExpectedDevice, {
  foreignKey: "deviceTypeId",
  as: "expectedDevices",
});
DeviceType.hasMany(Device, { foreignKey: "deviceTypeId", as: "devices" });

ExpectedDevice.belongsTo(Store, { foreignKey: "storeId", as: "store" });
ExpectedDevice.belongsTo(DeviceType, { foreignKey: "deviceTypeId", as: "deviceType" });

Device.belongsTo(DeviceType, { foreignKey: "deviceTypeId", as: "deviceType" });
Device.belongsTo(Store, { foreignKey: "storeId", as: "store" });

const syncDatabase = async () => {
  await sequelize.sync({ alter: true });
  console.log("Database synced successfully");
};

module.exports = { ...models, syncDatabase, sequelize };
