const express = require("express");
const router = express.Router();

const storeRoutes = require("./storeRoutes");
const deviceRoutes = require("./deviceRoutes");
const deviceTypeRoutes = require("./deviceTypeRoutes");

router.use("/stores", storeRoutes);
router.use("/devices", deviceRoutes);
router.use("/device-types", deviceTypeRoutes);

module.exports = router;
