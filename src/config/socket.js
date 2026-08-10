const {Server} = require("socket.io")

let ioInstance = null;

function initializeSocket(server){
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    socket.on("joinRoom", (roomCode) => {
        socket.join(roomCode);
    })
})

ioInstance = io;
return io;

}

function getIO(){
    return ioInstance;
}

module.exports = { initializeSocket, getIO };