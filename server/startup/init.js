const express = require("express");
const mongoInit = require("./mongoInit");
const cors = require("cors");
const logging = require("../middlewares/logging");
const { isAuthenticated } = require("../middlewares/auth");
const errorHandler = require("../middlewares/error-handler");
const redisClient = require("./redisClient");
const routes = require("../routes");

/**
 *
 * @param {*} app
 */
module.exports = async function init(app) {
  // Intializing Mongo connection
  mongoInit();

  // Intializing Redis connection
  await redisClient.init();

  // Intializing cors for cross-origin requests
  const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  // Intializing json for req.body
  app.use(express.json({ limit: "50mb" }));

  // Intializing Logging middleware
  app.use(logging);

  // Intializing Auth middleware
  app.use(isAuthenticated);

  // Intializing Router
  routes(app);

  // Intializing Error handling middleware
  app.use(errorHandler);

  // Catching uncaught exceptions and rejections so that server does not go down in any case
  process.on("uncaughtException", (ex) => {
    console.log(ex);
  });

  process.on("unhandledRejection", (ex) => {
    console.log(ex);
  });
};
