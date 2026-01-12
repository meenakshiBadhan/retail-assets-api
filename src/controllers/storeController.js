const storeService = require("../services/storeService");
const { conflict } = require("../middlewares/errorHandlers");
const { Op } = require("sequelize");
const { pagination } = require("../utils/pagination");

// Create a new store
exports.createStore = async (req, res, next) => {
  try {
    const { storeNumber, name } = req.body;

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

    res.json({
      success: true,
      message: "Store created successfully",
      data: store,
    });
  } catch (error) {
    next(error);
  }
};

// Update store details
exports.updateStore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { storeNumber, name } = req.body;

    // Check if store exists
    const store = await storeService.fetchStore({ id });
    if (!store) {
      return conflict(req, res, `Store with id ${id} not found`);
    }

    // Check for duplicate storeNumber or name (excluding current store)
    const existingStore = await storeService.fetchStore({
      [Op.and]: [
        { [Op.or]: [{ storeNumber: storeNumber }, { name: name }] },
        { id: { [Op.ne]: id } },
      ],
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

    // Update store details
    await storeService.updateStore(id, { storeNumber, name });

    res.json({
      success: true,
      message: "Store updated successfully",
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
    // Fetch stores with pagination
    const stores = await storeService.fetchAllStores({}, page, limit);

    // If stores found, return with meta info
    const totalCount = await storeService.fetchStoreCount();
    let meta = pagination(page, totalCount, limit);

    res.json({ success: true, stores, meta });
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
    success: true,
    message: "Store fetched successfully",
    data: store,
  });
};
