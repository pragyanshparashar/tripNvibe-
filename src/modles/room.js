const mongoose = require('mongoose'); 

const {ROOM_STATUS} =  require("../constants/app.constants"); 

const roomSchema = new mongoose.Schema({
    roomCode : {
        trype : String , 
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
    endDate: STring
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
tripOptions: [{
    title: String, 
    totalCost: Number,
    itinerary: Array

}],
selectedTrip: {
    type: Object,
    default: null
}, 
roomStatus : {
    type: String, 
    enum: Object.values(ROOM_STATUS),
    default: ROOM_STATUS.PLANNING
}
},{
    timepStamps: true
});

const Room = mongoose.model('Room', roomSchema);

module.exports =  Room; 