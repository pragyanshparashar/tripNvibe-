const express = require('express');
const router = express.Router();

const roomController = require("../controllers/room.controller")

router.post("/create", roomController.createRoom)
router.post("/join/:roomCode", roomController.joinRoom);
router.get("/:roomCode", roomController.getRoom);
router.post("/:roomCode/vote", roomController.castVote);
router.post("/:roomCode/finalize", roomController.finalizeVoting);
router.post("/:roomCode/expenses", roomController.addExpense);
router.delete("/:roomCode/expenses/:expenseId", roomController.deleteExpense);
router.post("/:roomCode/complete-payment", roomController.completePayment);

module.exports = router;