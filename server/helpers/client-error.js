class ClientError extends Error {
  /**
 *
 * @param {String} message
 * @param {Number} status
 */
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

module.exports = ClientError;
