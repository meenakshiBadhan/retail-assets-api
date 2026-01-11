const { Device } = require("../models");

// Create devices record
async function createDevice(deviceData) {
  try {
    const device = await Device.create({
      storeId: deviceData.storeId,
      deviceTypeId: deviceData.deviceTypeId,
      serialNumber: deviceData.serialNumber,
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

module.exports = {
  createDevice,
  fetchDevice,
};
