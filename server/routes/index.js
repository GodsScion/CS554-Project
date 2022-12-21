const users = require("./users");
const courses = require('./courses');
const professors = require('./professors');

const constructorMethod = (app) => {
  app.use("/api/users", users);
  app.use("/api/courses", courses);
  app.use("/api/professors", professors);

  app.use("*", (req, res) => {
    res.status(404).send('Page not found!');
  });
};

module.exports = constructorMethod;
