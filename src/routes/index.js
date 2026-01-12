const express = require("express");
const router = express.Router();

const storeRoutes = require("./storeRoutes");
const storeExpectedDeviceRoutes = require("./storeExpectedDeviceRoutes");
const deviceRoutes = require("./deviceRoutes");
const expectedDeviceRoutes = require("./expectedDeviceRoutes");
const deviceTypeRoutes = require("./deviceTypeRoutes");

router.use("/stores", storeRoutes);
router.use("/stores", storeExpectedDeviceRoutes);
router.use("/devices", deviceRoutes);
router.use("/expected-devices", expectedDeviceRoutes);
router.use("/device-types", deviceTypeRoutes);

module.exports = router;
