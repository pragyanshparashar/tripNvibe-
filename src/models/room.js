const mongoose = require('mongoose'); 

const {ROOM_STATUS} =  require("../constants/app.constants"); 

const roomSchema = new mongoose.Schema({
    roomCode : {
        type : String , 
        required: true, 
        unique: true
    },
    destination: {
        type: String,
        required: true
    },
    organizerName: {
        type: String , 
        required: true
    },
   tripDates: {
    startDate: String,
    endDate: String
   }, 
   vibeType:{
    type: String,
    required: true
   },
budget: {
    type: Number, 
    required: true
}, 
groupSize: {
    type: Number, 
    required: true
},

participants: [{
name: String, 
joinedAt: {
    type: Date, 
    default: Date.now
}
}],
tripOptions: {
    type: [Object],
    default: []
},
selectedTrip: {
    type: Object,
    default: null
},
votes: [{
    participantName: String,
    choiceIndex: Number,
    votedAt: {
        type: Date,
        default: Date.now
    }
}],
expenses: [{
    description: String,
    category: String,
    amount: Number,
    paidBy: String,
    splitAmong: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
}],
roomStatus : {
    type: String,
    enum: Object.values(ROOM_STATUS),
    default: ROOM_STATUS.PLANNING
},
paymentComplete: {
    type: Boolean,
    default: false
}
},{
    timepstamps: true
});

const Room = mongoose.model('Room', roomSchema);

module.exports =  Room; 