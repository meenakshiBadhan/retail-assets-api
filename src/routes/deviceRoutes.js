const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");
const { DeviceCreateValidator } = require("../validators/deviceValidator");

router.post("/", DeviceCreateValidator, deviceController.registerDevice);

module.exports = router;
