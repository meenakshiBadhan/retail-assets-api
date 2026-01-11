const Joi = require("joi");
const validate = require("../utils/validate");

// Schema for creating a device
const DeviceCreateSchema = Joi.object({
  serialNumber: Joi.string().required().label("Serial Number"),
  deviceTypeId: Joi.number().required().label("Device Type ID"),
  storeId: Joi.number().required().label("Store ID"),
});

// Middleware to validate device creation request
async function DeviceCreateValidator(req, res, next) {
  return validate(req.body, DeviceCreateSchema)
    .then(() => next())
    .catch((err) => next(err));
}

module.exports = { DeviceCreateValidator };
