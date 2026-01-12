const deviceTypeService = require("../services/deviceTypeService");
const { conflict } = require("../middlewares/errorHandlers");
const { pagination } = require("../utils/pagination");

// List all device types
exports.listDeviceTypes = async (req, res, next) => {
  let { page, limit } = req.query;

  // Set default values if not provided
  page = page ? Number(page) : Number(process.env.PAGE_NUM);
  limit = limit ? Number(limit) : Number(process.env.PER_PAGE_LIMIT);

  try {
    // Fetch device types with pagination
    const deviceTypes = await deviceTypeService.fetchAllDeviceTypes(
      {},
      page,
      limit
    );
    // If device types found, return with meta info
    if (deviceTypes && deviceTypes.length > 0) {
      const totalCount = await deviceTypeService.fetchDeviceTypeCount();
      let meta = pagination(page, totalCount, limit);

      res.json({ success: true, deviceTypes, meta });
    } else {
      return conflict(req, res, "Device types not found");
    }
  } catch (error) {
    next(error);
  }
};
