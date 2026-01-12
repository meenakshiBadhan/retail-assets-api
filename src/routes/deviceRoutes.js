const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const { DeviceCreateValidator } = require("../validators/deviceValidator");

// Fetch list of devices
router.get("/", deviceController.listDevices);

// Register a new device
router.post("/", DeviceCreateValidator, deviceController.registerDevice);

module.exports = router;
