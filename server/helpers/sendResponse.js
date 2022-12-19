/**
 *
 * @param {*} res
 * @param {*} data
 * @param {Number} statusCode
 */
module.exports = function (res, data = {}, statusCode = 200) {
  const response = {
    data: data,
  };

  return res.status(statusCode).send(response);
};
