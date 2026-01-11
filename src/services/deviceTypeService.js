const DeviceType = require("../models/deviceType");
const { paginate } = require("../utils/pagination");

// Fetch device type records
async function fetchAllDeviceTypes(query, page = null, limit = null) {
  try {
    return await DeviceType.findAll({
      where: query,
      order: [["createdAt", "DESC"]],
      ...(page && limit ? paginate(page, limit) : {}),
    });
  } catch (error) {
    throw new Error(`Error fetching device types: ${error.message}`);
  }
}

// Fetch device type count
async function fetchDeviceTypeCount(query) {
  try {
    return await DeviceType.count({
      where: query,
    });
  } catch (error) {
    throw new Error(`Error fetching device type count: ${error.message}`);
  }
}

module.exports = {
  fetchAllDeviceTypes,
  fetchDeviceTypeCount,
};
