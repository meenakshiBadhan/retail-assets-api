const { StatusCodes } = require("http-status-codes");
const buildError = require("../utils/buildError");

/**
 * Error response middleware for 401 unauthorized.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {String} message
 */
function unauthorized(req, res, message) {
  res.status(StatusCodes.UNAUTHORIZED)?.json({
    success: false,
    data: null,
    message: message
      ? message
      : StatusCodes.getStatusText(StatusCodes.UNAUTHORIZED),
  });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
function genericErrorHandler(err, req, res, next) {
  const error = buildError(err);
  res.status(error.code).json(error);
}

/**
 * conflict  409
 * @param {Object} req
 * @param {Object} res
 * @param {String} message
 */
function conflict(req, res, message, data) {
  res.status(200).json({
    success: false,
    data: data ? data : null,
    message: message
      ? message
      : StatusCodes.getStatusText(StatusCodes.CONFLICT),
  });
}

module.exports = {
  unauthorized,
  genericErrorHandler,
  conflict,
};
