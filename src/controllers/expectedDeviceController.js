const { conflict } = require("../middlewares/errorHandlers");
const expectedDeviceService = require("../services/expectedDeviceService");
const storeService = require("../services/storeService");
const { pagination } = require("../utils/pagination");

// Create expected device for a store
exports.createStoreExpectedDevice = async (req, res, next) => {
  const { id } = req.params;
  const { deviceTypeId, expectedQuantity } = req.body;

  try {
    // Check if store exists
    const store = await storeService.fetchStore({ id });
    if (!store) {
      return conflict(req, res, `Store with id ${id} not found`);
    }

    // Check if expected device already exists for this store and device type
    const existing = await expectedDeviceService.fetchExpectedDevice({
      storeId: id,
      deviceTypeId,
    });

    if (existing) {
      return conflict(
        req,
        res,
        `Expected device already exists for this store and device type`
      );
    }

    // Create expected device
    const expectedDevice = await expectedDeviceService.createExpectedDevice({
      storeId: parseInt(id),
      deviceTypeId,
      expectedQuantity,
    });

    res.json({
      success: true,
      message: "Expected device created successfully",
      data: expectedDevice,
    });
  } catch (error) {
    next(error);
  }
};

// Update expected device
exports.updateStoreExpectedDevice = async (req, res, next) => {
  const { id, expectedDeviceId } = req.params;
  const { expectedQuantity } = req.body;

  try {
    // Check if expected device exists for this store
    const expectedDevice = await expectedDeviceService.fetchExpectedDevice({
      id: expectedDeviceId,
      storeId: id,
    });

    if (!expectedDevice) {
      return conflict(req, res, `Expected device not found for this store`);
    }

    // Update expected device
    const updated = await expectedDeviceService.updateExpectedDevice(
      expectedDeviceId,
      { expectedQuantity }
    );

    res.json({
      success: true,
      message: "Expected device updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// Delete expected device
exports.deleteStoreExpectedDevice = async (req, res, next) => {
  const { id, expectedDeviceId } = req.params;

  try {
    // Check if expected device exists for this store
    const expectedDevice = await expectedDeviceService.fetchExpectedDevice({
      id: expectedDeviceId,
      storeId: id,
    });

    if (!expectedDevice) {
      return conflict(req, res, `Expected device not found for this store`);
    }

    // Delete expected device
    await expectedDeviceService.deleteExpectedDevice(expectedDeviceId);

    res.json({
      success: true,
      message: "Expected device deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// List all devices with pagination
exports.listExpectedDevices = async (req, res, next) => {
  let { page, limit, storeId } = req.query;

  // Set default values if not provided
  page = page ? Number(page) : Number(process.env.PAGE_NUM);
  limit = limit ? Number(limit) : Number(process.env.PER_PAGE_LIMIT);

  try {
    // Build query object - only fetch records where expectedQuantity > 0
    const query = {
      expectedQuantity: {
        [require("sequelize").Op.gt]: 0,
      },
    };

    // Add storeId filter if provided
    if (storeId) {
      query.storeId = storeId;
    }

    // Fetch devices
    const devices = await expectedDeviceService.fetchAllExpectedDevices(
      query,
      page,
      limit
    );
    if (devices && devices.length > 0) {
      // Fetch total count for pagination metadata
      const totalCount = await expectedDeviceService.fetchExpectedDeviceCount(
        query
      );
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
