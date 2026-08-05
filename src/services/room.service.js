const Room = require("../models/room")
const generateRoomCode = require("../utils/generateRoomCode")

async function createRoom (roomData) {
    const roomCode = generateRoomCode();
    const room = await Room.create({
        roomCode,
        organizerName : roomData.organizerName,
        destination: roomData.destination,
        tripDates: roomData.tripDates,
        vibeType: roomData.vibeType,
        budget: roomData.budget, 
        groupSize: roomData.groupSize,
        participants: [
            {
                name: roomData.organizerName
            }
        ]
    })

    return room;
}

async function joinRoom (roomCode , participantName){
    const room = await Room.findOne({roomCode})
    if(!room) {
        return null;
    }
  room.participants.push({name: participantName})
  await room.save();
  return room ;

}

async function getRoomByCode(roomCode){
    const room = await Room.findOne({roomCode})
    return room ; 
}


module.exports = {
    createRoom,
    joinRoom,
    getRoomByCode
}