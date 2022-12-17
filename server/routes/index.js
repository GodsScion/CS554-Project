const users = require("./users");

const constructorMethod = (app) => {
  app.use("/users", users);

  app.use("*", (req, res) => {
    res.status(404).send('Page not found!');
  });
};

module.exports = constructorMethod;
