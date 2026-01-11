const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");
const { StoreCreateValidator } = require("../validators/storeValidator");

router.get("/", storeController.listStores);
router.get("/:id", storeController.getStoreById);
router.post("/", StoreCreateValidator, storeController.createStore);

module.exports = router;
