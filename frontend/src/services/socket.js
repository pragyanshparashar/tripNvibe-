import { io } from 'socket.io-client'

let socket = null

function getSocket() {
  if (!socket) {
    socket = io({ autoConnect: false })
  }
  return socket
}

export function joinRoomChannel(roomCode) {
  const socketInstance = getSocket()
  if (!socketInstance.connected) {
    socketInstance.connect()
  }
  socketInstance.emit('joinRoom', roomCode)
  return socketInstance
}

export function subscribeToRoomUpdates(callback) {
  const socketInstance = getSocket()
  socketInstance.on('room:updated', callback)
  return () => socketInstance.off('room:updated', callback)
}

export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect()
  }
}
