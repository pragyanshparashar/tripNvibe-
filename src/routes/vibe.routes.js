const express = require("express");

const {
  generateTrip
} = require("../controllers/vibe.controller");

const router = express.Router();

router.post("/generate", generateTrip);

module.exports = router;