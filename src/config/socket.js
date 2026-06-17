const {Server} = require("socket.io")

function initializeSocket(server){
const io = new Server(server, {
    cors: {
        origin: "*"
    }
}) 
return io;

}

module.exports = initializeSocket; 