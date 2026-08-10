const roomService = require("../services/room.service");
const { getIO } = require("../config/socket");
const {successResponse,
    errorResponse} = require("../utils/responseHandler");

function broadcastRoomUpdate(roomCode, room){
    const io = getIO();
    if(io){
        io.to(roomCode).emit("room:updated", room)
    }
}

    async function createRoom (req,res, next){
        try{
        const room = await roomService.createRoom(req.body)

    return successResponse(res, "Room created successfully", room)}

catch(error){
    next(error)
}}

async function joinRoom(req,res, next){
    try{
        const {roomCode} = req.params;
        const{participantName} = req.body;

        const room = await roomService.joinRoom(roomCode, participantName)

        if(!room){
            return errorResponse(res, "Room not found", 404)
        }
        broadcastRoomUpdate(roomCode, room);
        return successResponse(res, "Joined room successfully", room)
    }catch(error){
        next(error)
    }

}

async function getRoom(req, res, next){
    try{
        const {roomCode} = req.params;
        const room = await roomService.getRoomByCode(roomCode)

        if(!room){
            return errorResponse(res, "Room not found", 404)
        }
        return successResponse(res, "Room retrieved successfully", room)
    }catch(error){
next(error)    }
}

async function castVote(req, res, next){
    try{
        const { roomCode } = req.params;
        const { participantName, choiceIndex } = req.body;

        if(!participantName || choiceIndex === undefined){
            return errorResponse(res, "participantName and choiceIndex are required", 400)
        }

        const room = await roomService.castVote(roomCode, participantName, choiceIndex)

        if(!room){
            return errorResponse(res, "Room not found", 404)
        }
        broadcastRoomUpdate(roomCode, room);
        return successResponse(res, "Vote cast successfully", room)
    }catch(error){
        next(error)
    }
}

async function finalizeVoting(req, res, next){
    try{
        const { roomCode } = req.params;
        const { choiceIndex } = req.body;

        if(choiceIndex === undefined){
            return errorResponse(res, "choiceIndex is required", 400)
        }

        const room = await roomService.finalizeVoting(roomCode, choiceIndex)

        if(!room){
            return errorResponse(res, "Room not found", 404)
        }
        broadcastRoomUpdate(roomCode, room);
        return successResponse(res, "Voting finalized successfully", room)
    }catch(error){
        next(error)
    }
}

async function addExpense(req, res, next){
    try{
        const { roomCode } = req.params;
        const { description, category, amount, paidBy, splitAmong } = req.body;

        if(!description || !amount || !paidBy || !Array.isArray(splitAmong) || splitAmong.length === 0){
            return errorResponse(res, "description, amount, paidBy and splitAmong are required", 400)
        }

        const room = await roomService.addExpense(roomCode, { description, category, amount, paidBy, splitAmong })

        if(!room){
            return errorResponse(res, "Room not found", 404)
        }
        broadcastRoomUpdate(roomCode, room);
        return successResponse(res, "Expense added successfully", room)
    }catch(error){
        next(error)
    }
}

async function deleteExpense(req, res, next){
    try{
        const { roomCode, expenseId } = req.params;

        const room = await roomService.deleteExpense(roomCode, expenseId)

        if(!room){
            return errorResponse(res, "Room not found", 404)
        }
        broadcastRoomUpdate(roomCode, room);
        return successResponse(res, "Expense deleted successfully", room)
    }catch(error){
        next(error)
    }
}

module.exports = {
  createRoom,
  joinRoom,
  getRoom,
  castVote,
  finalizeVoting,
  addExpense,
  deleteExpense
};

 