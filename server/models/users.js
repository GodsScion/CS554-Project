const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 3,
      required: true,
    },
    lastName: {
      type: String,
      min: 1,
      required: true,
    },
    name: {
      type: String,
      min: 1,
      required: true,
    },
    email: {
      type: String,
      min: 3,
      required: true,
    },
    password: {
      type: String,
      min: 3,
      required: true,
    },
    img: {
      type: String,
      required: true,
    }
  },
  { strict: true }
);

module.exports = mongoose.model("users", schema, "users");
