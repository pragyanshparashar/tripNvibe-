const Room = require("../models/room")
const generateRoomCode = require("../utils/generateRoomCode")
const { ROOM_STATUS } = require("../constants/app.constants")

async function createRoom (roomData) {
    const roomCode = generateRoomCode();
    const isShortlist = Array.isArray(roomData.tripOptions) && roomData.tripOptions.length > 1;

    const room = await Room.create({
        roomCode,
        organizerName : roomData.organizerName,
        destination: roomData.destination,
        tripDates: roomData.tripDates,
        vibeType: roomData.vibeType,
        budget: roomData.budget,
        groupSize: roomData.groupSize,
        tripOptions: isShortlist ? roomData.tripOptions : [],
        selectedTrip: isShortlist ? null : roomData.selectedTrip,
        roomStatus: isShortlist ? ROOM_STATUS.VOTING : ROOM_STATUS.PLANNING,
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

async function castVote(roomCode, participantName, choiceIndex){
    const room = await Room.findOne({roomCode})
    if(!room){
        return null;
    }

    if(room.roomStatus !== ROOM_STATUS.VOTING){
        throw new Error("This room is not open for voting");
    }

    if(!Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= room.tripOptions.length){
        throw new Error("Invalid itinerary choice");
    }

    const existingVote = room.votes.find((vote) => vote.participantName === participantName)
    if(existingVote){
        existingVote.choiceIndex = choiceIndex;
        existingVote.votedAt = new Date();
    } else {
        room.votes.push({ participantName, choiceIndex })
    }

    await room.save();
    return room;
}

async function finalizeVoting(roomCode, choiceIndex){
    const room = await Room.findOne({roomCode})
    if(!room){
        return null;
    }

    if(!Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= room.tripOptions.length){
        throw new Error("Invalid itinerary choice");
    }

    room.selectedTrip = room.tripOptions[choiceIndex];
    room.roomStatus = ROOM_STATUS.FINALIZED;

    await room.save();
    return room;
}

async function addExpense(roomCode, expenseData){
    const room = await Room.findOne({roomCode})
    if(!room){
        return null;
    }

    room.expenses.push({
        description: expenseData.description,
        category: expenseData.category,
        amount: expenseData.amount,
        paidBy: expenseData.paidBy,
        splitAmong: expenseData.splitAmong
    })

    await room.save();
    return room;
}

async function deleteExpense(roomCode, expenseId){
    const room = await Room.findOne({roomCode})
    if(!room){
        return null;
    }

    room.expenses.pull({ _id: expenseId })

    await room.save();
    return room;
}

async function markPaymentComplete(roomCode){
    const room = await Room.findOne({roomCode})
    if(!room){
        return null;
    }

    room.paymentComplete = true;

    await room.save();
    return room;
}

module.exports = {
    createRoom,
    joinRoom,
    getRoomByCode,
    castVote,
    finalizeVoting,
    addExpense,
    deleteExpense,
    markPaymentComplete
}