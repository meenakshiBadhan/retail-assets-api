const isEmpty = require("lodash/isEmpty");

// Utility helper for Joi validation
function validate(data, schema) {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (!isEmpty(error)) {
    return Promise.reject(error);
  }

  return Promise.resolve(value);
}

module.exports = validate;
