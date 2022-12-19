const server = require("http").createServer();

const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);
   
    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
   
    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
   
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} diconnected`);
      socket.leave(roomId);
    });
});


server.listen(8080, () => {
    console.log("Socket.io server is running on port 8080");
});
