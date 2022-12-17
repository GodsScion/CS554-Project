class ServerError extends Error {
  /**
 *
 * @param {String} description
 * @param {Number} status
 * @param {String} message
 */
  constructor(description = '', message = 'Internal server error!', status = 500) {
    this.status = status;
    this.message = message;
    this.description = description;
  };
};

module.exports = ServerError;
