const userRoutes = require("./users");

const constructorMethod = (app) => {
  app.use("/users", userRoutes);

  app.use("*", (req, res) => {
    res.status(404).json("Error: Route not found");
  });
};

module.exports = constructorMethod;