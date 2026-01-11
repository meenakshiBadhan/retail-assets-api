const Joi = require("joi");
const validate = require("../utils/validate");

// Schema for creating a store
const StoreCreateSchema = Joi.object({
  storeNumber: Joi.string().required().label("Store Number"),
  name: Joi.string().required().label("Store Name"),
  expectedDevices: Joi.array()
    .items(
      Joi.object({
        deviceTypeId: Joi.number().required().label("Device Type ID"),
        expectedQuantity: Joi.number().required().label("Expected Quantity"),
      })
    )
    .optional()
    .label("Expected Devices"),
});

// Middleware to validate store creation request
async function StoreCreateValidator(req, res, next) {
  return validate(req.body, StoreCreateSchema)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { StoreCreateValidator };
