const { conflict } = require("../middlewares/errorHandlers");
const deviceService = require("../services/deviceService");

// Create a new device
exports.registerDevice = async (req, res, next) => {
  try {
    const { storeId, deviceTypeId, serialNumber } = req.body;

    // Check for duplicate serialNumber
    const existingDevice = await deviceService.fetchDevice({
      serialNumber: serialNumber,
    });

    // If duplicate found, return conflict response
    if (existingDevice) {
      return conflict(
        req,
        res,
        `Device with serial number ${serialNumber} already exists`
      );
    }

    // Create the device if no duplicates
    await deviceService.createDevice({ storeId, deviceTypeId, serialNumber });

    res.json({
      message: "Device created successfully",
    });
  } catch (error) {
    next(error);
  }
};
