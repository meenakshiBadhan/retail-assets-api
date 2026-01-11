const express = require("express");
const router = express.Router();
const deviceTypeController = require("../controllers/deviceTypeController");

router.get("/", deviceTypeController.listDeviceTypes);

module.exports = router;
