const { sequelize } = require("../config/database");
const Store = require("./store");
const DeviceType = require("./deviceType");
const ExpectedDevice = require("./expectedDevice");
const Device = require("./device");

const models = { Store, DeviceType, ExpectedDevice, Device };

// Setup associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = { ...models, sequelize };
