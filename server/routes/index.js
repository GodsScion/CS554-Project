const users = require("./users");
const courses = require('./courses');
const professors = require('./professors');

const constructorMethod = (app) => {
  app.use("/users", users);
  app.use("/courses", courses);
  app.use("/professors", professors);

  app.use("*", (req, res) => {
    res.status(404).send('Page not found!');
  });
};

module.exports = constructorMethod;
