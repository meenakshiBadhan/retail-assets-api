const { StatusCodes } = require("http-status-codes");
const Joi = require("joi");

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
function buildError(err) {
  // Validation errors
  if (Joi.isError(err)) {
    return {
      success: false,
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      message: err.message
        ? err.message
        : StatusCodes.getStatusText(StatusCodes.UNPROCESSABLE_ENTITY),
      errors:
        err.details &&
        err.details.map((err) => {
          return {
            message: err.message,
            param: err.path.join("."),
          };
        }),
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    success: false,
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message
      ? err.message
      : StatusCodes.getStatusText(StatusCodes.INTERNAL_SERVER_ERROR),
  };
}

module.exports = buildError;
