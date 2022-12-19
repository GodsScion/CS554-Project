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
  console.log(response);
  /*
module.exports = function (res, data, statusCode = 200) {
  const response = {
    data: data._id,
  };*/

  return res.status(statusCode).send(response);
};
