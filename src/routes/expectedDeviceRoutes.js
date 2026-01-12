const express = require("express");
const router = express.Router();
const expectedDeviceController = require("../controllers/expectedDeviceController");

// Fetch list of expected devices
router.get("/", expectedDeviceController.listExpectedDevices);

module.exports = router;
