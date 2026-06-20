const {nanoid} = require('nanoid'); 


function generateRoomCode (){
    const roomCode = nanoid(6).toUpperCase();
    return roomCode;            
}

module.exports = generateRoomCode; 

