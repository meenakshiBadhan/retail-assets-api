const express = require("express");
const router = express.Router();
const deviceTypeController = require("../controllers/deviceTypeController");

// Fetch list of device types
router.get("/", deviceTypeController.listDeviceTypes);

module.exports = router;
