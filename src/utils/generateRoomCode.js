const { customAlphabet } = require("nanoid");

// Restrict characters to uppercase letters & numbers, length 6
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 6);

function generateRoomCode() {
  return nanoid();
}

module.exports = generateRoomCode;

