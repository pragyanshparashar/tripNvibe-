const express = require('express');
const router = express.Router();

const roomController = require("../controllers/room.controller")

router.post("/create", roomController.createRoom)
router.post("/join/:roomCode", roomController.joinRoom);
router.get("/:roomCode", roomController.getRoom);

module.exports = router;