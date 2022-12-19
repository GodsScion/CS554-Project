const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
     // min: 3,
     // required: true,
    },
    lastName: {
      type: String,
     // min: 1,
     // required: true,
    },
    name: {
      type: String,
    //  min: 1,
     // required: true,
    },
    username: {
      type: String,
      min: 3,
      // required: true,
    },
    email: {
      type: String,
<<<<<<< Updated upstream
      min: 3,
      // required: true,
=======
    //  min: 3,
    //  required: true,
>>>>>>> Stashed changes
    },
    password: {
      type: String,
     // min: 3,
    //  required: true,
    }
  },
  { strict: true }
);

module.exports = mongoose.model("users", schema, "users");
