const { ExpectedDevice, DeviceType, Store } = require("../models");
const { paginate } = require("../utils/pagination");
const { Op } = require("sequelize");

// Fetch expected device by store and device type
async function fetchExpectedDevice(query) {
  try {
    return await ExpectedDevice.findOne({
      where: query,
    });
  } catch (error) {
    throw new Error(`Error fetching expected device: ${error.message}`);
  }
}

// Update expected device
async function updateExpectedDevice(id, updateData) {
  try {
    const expectedDevice = await ExpectedDevice.findByPk(id);
    if (!expectedDevice) {
      throw new Error("Expected device not found");
    }

    await expectedDevice.update(updateData);
    return expectedDevice;
  } catch (error) {
    throw new Error(`Error updating expected device: ${error.message}`);
  }
}

// Delete single expected device
async function deleteExpectedDevice(id) {
  try {
    await ExpectedDevice.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Error deleting expected device: ${error.message}`);
  }
}

// Decrement expected quantity
async function decrementExpectedQuantity(expectedDeviceId) {
  try {
    const expectedDevice = await ExpectedDevice.findByPk(expectedDeviceId);
    if (!expectedDevice) {
      throw new Error("Expected device not found");
    }

    await expectedDevice.decrement("expectedQuantity", { by: 1 });
    return expectedDevice;
  } catch (error) {
    throw new Error(`Error decrementing expected quantity: ${error.message}`);
  }
}

// Create expected devices record
async function createExpectedDevice(expectedDeviceData) {
  try {
    const expectedDevice = await ExpectedDevice.create({
      storeId: expectedDeviceData.storeId,
      deviceTypeId: expectedDeviceData.deviceTypeId,
      expectedQuantity: expectedDeviceData.expectedQuantity,
    });
    return expectedDevice;
  } catch (error) {
    console.error("Error in createExpectedDevice:", error);
    throw new Error(`Error creating expected device: ${error.message}`);
  }
}

// Fetch device records
async function fetchAllExpectedDevices(query, page = null, limit = null) {
  try {
    return await ExpectedDevice.findAll({
      where: query,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "expectedQuantity"],
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
async function fetchExpectedDeviceCount(query) {
  try {
    return await ExpectedDevice.count({
      where: query,
    });
  } catch (error) {
    throw new Error(`Error fetching device count: ${error.message}`);
  }
}

module.exports = {
  createExpectedDevice,
  fetchExpectedDevice,
  fetchAllExpectedDevices,
  fetchExpectedDeviceCount,
  decrementExpectedQuantity,
  updateExpectedDevice,
  deleteExpectedDevice,
};
