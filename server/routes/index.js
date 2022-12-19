const users = require("./users");
const courses = require('./courses');

const constructorMethod = (app) => {
  app.use("/users", users);
  app.use("/courses", courses);

  app.use("*", (req, res) => {
    res.status(404).send('Page not found!');
  });
};

module.exports = constructorMethod;
