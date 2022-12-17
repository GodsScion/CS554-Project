class ClientError extends Error {
  /**
 *
 * @param {String} message
 * @param {Number} status
 */
  constructor(message, status = 400) {
    this.status = status;
    this.message = message;
  }
}

module.exports = ClientError;
