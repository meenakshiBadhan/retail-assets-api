const { ExpectedDevice, DeviceType, Device } = require("../models");
const { sequelize } = require("../config/database");
const Store = require("../models/store");
const { paginate } = require("../utils/pagination");

// Fetch store records
async function fetchAllStores(query, page = null, limit = null) {
  try {
    return await Store.findAll({
      where: query,
      order: [["createdAt", "DESC"]],
      ...(page && limit ? paginate(page, limit) : {}),
    });
  } catch (error) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
}

// Fetch store details
async function fetchStore(query) {
  try {
    return await Store.findOne({
      where: query,
      include: [
        {
          model: ExpectedDevice,
          as: "expectedDevices",
          attributes: {
            include: [
              [
                sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM "devices"
                  WHERE "devices"."storeId" = "expectedDevices"."storeId"
                  AND "devices"."deviceTypeId" = "expectedDevices"."deviceTypeId"
                )`),
                "registeredQuantity",
              ],
            ],
          },
          include: [
            {
              model: DeviceType,
              as: "deviceType",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: Device,
          as: "devices",
          attributes: ["id", "serialNumber", "status"],
          include: [
            {
              model: DeviceType,
              as: "deviceType",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
  } catch (error) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
}

// Fetch store count
async function fetchStoreCount(query) {
  try {
    return await Store.count({
      where: query,
    });
  } catch (error) {
    throw new Error(`Error fetching store count: ${error.message}`);
  }
}

// Create store record
async function createStore(storeData) {
  try {
    const store = await Store.create({
      storeNumber: storeData.storeNumber,
      name: storeData.name,
    });
    return store;
  } catch (error) {
    throw new Error(`Error creating store: ${error.message}`);
  }
}

module.exports = {
  createStore,
  fetchAllStores,
  fetchStore,
  fetchStoreCount,
};
