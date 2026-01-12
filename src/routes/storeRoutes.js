const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const {
  StoreCreateValidator,
  StoreUpdateValidator,
} = require("../validators/storeValidator");

// Fetch list of stores
router.get("/", storeController.listStores);

// Get store details
router.get("/:id", storeController.getStoreById);

// Update store details
router.put("/:id", StoreUpdateValidator, storeController.updateStore);

// Create a new store
router.post("/", StoreCreateValidator, storeController.createStore);

module.exports = router;
