/**
 *
 * @param {*} app
 */
module.exports = async (server) => {

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

    // Catching uncaught exceptions and rejections so that server does not go down in any case
    process.on('uncaughtException', (ex) => {
        console.log(ex);
    });

    process.on('unhandledRejection', (ex) => {
        console.log(ex);
    });
};
