
const mongoose = require('mongoose');
const { mongoUrl } = require('../config/default.json');

module.exports = function connect() {

  const options = {
    useNewUrlParser: true,
    keepAlive: true,
    connectTimeoutMS: 5000,
    maxPoolSize: 50,
  };

  mongoose.set('strictQuery', true);

  // Initial connection
  mongoose.connect(mongoUrl, options)
    .then(
      () => console.log(`Connected to MongoDB`))
    .catch((error) => {
      console.log(error.message);
      console.log('Failed to connect DB');
      process.exit(0);
    });

  // Handling errors
  mongoose.connection.on('error', (err) => {
    console.log(err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
  });

  mongoose.connection.on('reconnected', function () {
    console.log('mongodb reconnected');
  });
};
