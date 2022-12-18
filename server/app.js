const express = require("express");
const app = express();
const init = require("./startup/init");

app.listen(4000, async () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:4000");
  await init(app);
});
