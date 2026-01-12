const { Device, DeviceType, Store } = require("../models");
const { paginate } = require("../utils/pagination");

// Create device record
async function createDevice(deviceData) {
  try {
    const device = await Device.create({
      storeId: deviceData.storeId,
      deviceTypeId: deviceData.deviceTypeId,
      serialNumber: deviceData.serialNumber,
      status: deviceData.status,
    });
    return device;
  } catch (error) {
    console.error("Error in create device:", error);
    throw new Error(`Error creating device: ${error.message}`);
  }
}

// Fetch device details
async function fetchDevice(query) {
  try {
    return await Device.findOne({
      where: query,
    });
  } catch (error) {
    throw new Error(`Error fetching devices: ${error.message}`);
  }
}

// Fetch device records
async function fetchAllDevices(query, page = null, limit = null) {
  try {
    return await Device.findAll({
      where: query,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "serialNumber", "status"],
      include: [
        {
          model: DeviceType,
          as: "deviceType",
          attributes: ["id", "name"],
        },
        {
          model: Store,
          as: "store",
          attributes: ["id", "storeNumber", "name"],
        },
      ],
      ...(page && limit ? paginate(page, limit) : {}),
    });
  } catch (error) {
    throw new Error(`Error fetching devices: ${error.message}`);
  }
}

// Fetch device count
async function fetchDeviceCount(query) {
  try {
    return await Device.count({
      where: query,
    });
  } catch (error) {
    throw new Error(`Error fetching device count: ${error.message}`);
  }
}

module.exports = {
  createDevice,
  fetchDevice,
  fetchAllDevices,
  fetchDeviceCount,
};
