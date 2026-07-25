const roomService = require("../services/room.service");
const {successResponse,
    errorResponse} = require("../utils/responseHandler");

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

module.exports = {
  createRoom,
  joinRoom,
  getRoom
};

 