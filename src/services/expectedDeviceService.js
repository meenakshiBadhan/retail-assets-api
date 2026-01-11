const ExpectedDevice = require("../models/expectedDevice");

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

module.exports = {
  createExpectedDevice,
};
