
const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const roomRoutes = require("./routes/room.routes");
const vibeRoutes = require("./routes/vibe.routes");
const app = express();

const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// API routes
app.use("/api/v1/rooms", roomRoutes);
app.use("/api/v1/vibe", vibeRoutes);

// Serve the built frontend (frontend/dist) and fall back to it for
// client-side routes, so the app works as a single deployed service.
const frontendDistPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));

app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api") || req.path.startsWith("/socket.io")) {
        return next();
    }
    res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
        if (err) next();
    });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);
module.exports = app;