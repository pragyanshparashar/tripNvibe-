const app = require("./app");
const connectDB = require("./config/db");
const env = require("./config/env");
global.crypto = require("crypto");
const http = require("http");
const initializeSocket = require("./config/socket");
async function startServer(){
  try {
    await connectDB();

    const server = http.createServer(app)

    const io = initializeSocket(server);

    server.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();