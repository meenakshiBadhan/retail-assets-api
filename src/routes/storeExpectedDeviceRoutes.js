const express = require("express");
const router = express.Router();
const expectedDeviceController = require("../controllers/expectedDeviceController");

// Fetch list of expected devices for a store
router.post(
  "/:id/expected-devices",
  expectedDeviceController.createStoreExpectedDevice
);

// Update expected device for a store
router.put(
  "/:id/expected-devices/:expectedDeviceId",
  expectedDeviceController.updateStoreExpectedDevice
);

// Delete expected device from a store
router.delete(
  "/:id/expected-devices/:expectedDeviceId",
  expectedDeviceController.deleteStoreExpectedDevice
);

module.exports = router;
