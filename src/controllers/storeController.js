const storeService = require("../services/storeService");
const expectedDeviceService = require("../services/expectedDeviceService");
const { conflict } = require("../middlewares/errorHandlers");
const { Op } = require("sequelize");
const { pagination } = require("../utils/pagination");

// Create a new store
exports.createStore = async (req, res, next) => {
  try {
    const { storeNumber, name, expectedDevices } = req.body;

    // Check for duplicate storeNumber or name
    const existingStore = await storeService.fetchStore({
      [Op.or]: [{ storeNumber: storeNumber }, { name: name }],
    });

    // If duplicate found, return conflict response
    if (existingStore) {
      let errMsg = "";
      if (existingStore.storeNumber === storeNumber) {
        errMsg = `Store with storeNumber ${storeNumber} already exists`;
      }
      if (existingStore.name === name) {
        errMsg = `Store with name ${name} already exists`;
      }
      return conflict(req, res, errMsg);
    }

    // Create the store if no duplicates
    const store = await storeService.createStore({ storeNumber, name });

    // Create expected devices for the store
    if (expectedDevices && Array.isArray(expectedDevices)) {
      const expectedDevicePromises = expectedDevices.map(async (device) => {
        const payload = {
          storeId: store.id,
          deviceTypeId: device.deviceTypeId,
          expectedQuantity: device.expectedQuantity,
        };
        return await expectedDeviceService.createExpectedDevice(payload);
      });
      await Promise.all(expectedDevicePromises);
    }

    res.json({
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

// List all stores with pagination
exports.listStores = async (req, res, next) => {
  let { page, limit } = req.query;

  // Set default values if not provided
  page = page ? Number(page) : Number(process.env.PAGE_NUM);
  limit = limit ? Number(limit) : Number(process.env.PER_PAGE_LIMIT);

  try {
    const stores = await storeService.fetchAllStores({}, page, limit);
    if (stores && stores.length > 0) {
      const totalCount = await storeService.fetchStoreCount();
      let meta = pagination(page, totalCount, limit);

      res.json({ stores, meta });
    } else {
      return conflict(req, res, "Stores not found");
    }
  } catch (error) {
    next(error);
  }
};

// Get store details by ID
exports.getStoreById = async (req, res) => {
  const { id } = req.params;
  // Fetch store by ID
  const store = await storeService.fetchStore({ id });

  // If store not found, return conflict response
  if (!store) {
    return conflict(req, res, `Store with id ${id} not found`);
  }

  // Return store details
  res.json({
    message: "Store fetched successfully",
    data: store,
  });
};
