const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).json({success: true,message: "Welcome to the TripNvibe API!"});
 
});
app.use(notFoundMiddleware);
app.use(errorMiddleware);
module.exports = app; 