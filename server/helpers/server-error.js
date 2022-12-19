class ServerError extends Error {
  /**
<<<<<<< Updated upstream
 *
 * @param {String} description
 * @param {Number} status
 * @param {String} message
 */
  constructor(description = '', message = 'Internal server error!', status = 500) {
=======
   *
   * @param {String} description
   * @param {Number} status
   * @param {String} message
   */
  constructor(
    description = "",
    message = "Internal server error!",
    status = 500
  ) {
>>>>>>> Stashed changes
    super(message);
    this.status = status;
    this.message = message;
    this.description = description;
  }
}

module.exports = ServerError;
