const express = require('express');
const expressServer = express();
const socketServer = require("http").createServer();
const init = require('./startup/init');
const socketInit = require('./startup/socketInit');

expressServer.listen(4000, async () => {
    console.log('Express server is up and running on http://localhost:4000');
    await init(expressServer);
});

socketServer.listen(4001, async () => {
    console.log("Socket server is up and running on http://localhost:4001");
    await socketInit(socketServer);
});
