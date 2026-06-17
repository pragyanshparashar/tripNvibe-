const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).json({success: true,message: "Welcome to the TripNvibe API!"});
 
});

module.exports = app; 