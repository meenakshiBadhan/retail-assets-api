const { conflict } = require("../middlewares/errorHandlers");
const deviceService = require("../services/deviceService");
const expectedDeviceService = require("../services/expectedDeviceService");
const { pagination } = require("../utils/pagination");

// Create a new device
exports.registerDevice = async (req, res, next) => {
  try {
    const { storeId, deviceTypeId, serialNumber } = req.body;

    // Validate expected device exists for this store and device type
    const expectedDevice = await expectedDeviceService.fetchExpectedDevice({
      storeId,
      deviceTypeId,
    });

    if (!expectedDevice || expectedDevice.expectedQuantity <= 0) {
      return conflict(
        req,
        res,
        "Expected devices not found for provided store and device type"
      );
    }

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

    // Create the device
    await deviceService.createDevice({
      storeId,
      deviceTypeId,
      serialNumber,
      status: "ASSIGNED",
    });

    // Decrement expected quantity
    await expectedDeviceService.decrementExpectedQuantity(expectedDevice.id);

    res.json({
      success: true,
      message: "Device created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// List all devices with pagination
exports.listDevices = async (req, res, next) => {
  let { page, limit, deviceStatus } = req.query;

  // Set default values if not provided
  page = page ? Number(page) : Number(process.env.PAGE_NUM);
  limit = limit ? Number(limit) : Number(process.env.PER_PAGE_LIMIT);

  try {
    // Build query object for filtering
    const query = {};
    if (deviceStatus) {
      query.status = deviceStatus.toUpperCase();
    }
    // Fetch devices
    const devices = await deviceService.fetchAllDevices(query, page, limit);
    if (devices && devices.length > 0) {
      // Fetch total count for pagination metadata
      const totalCount = await deviceService.fetchDeviceCount(query);
      // Generate pagination metadata
      let meta = pagination(page, totalCount, limit);

      res.json({ success: true, devices, meta });
    } else {
      return conflict(req, res, "Devices not found");
    }
  } catch (error) {
    next(error);
  }
};
