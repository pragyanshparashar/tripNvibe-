import api from './api'

const FALLBACK_ERROR = 'Something went wrong. Please try again.'

function unwrap(promise) {
  return promise
    .then((response) => response.data.data)
    .catch((error) => {
      const message = error.response?.data?.message || FALLBACK_ERROR
      throw new Error(message)
    })
}

export function createRoom(roomData) {
  return unwrap(api.post('/rooms/create', roomData))
}

export function joinRoom(roomCode, participantName) {
  return unwrap(api.post(`/rooms/join/${roomCode}`, { participantName }))
}

export function getRoom(roomCode) {
  return unwrap(api.get(`/rooms/${roomCode}`))
}

export function castVote(roomCode, participantName, choiceIndex) {
  return unwrap(api.post(`/rooms/${roomCode}/vote`, { participantName, choiceIndex }))
}

export function finalizeVoting(roomCode, choiceIndex) {
  return unwrap(api.post(`/rooms/${roomCode}/finalize`, { choiceIndex }))
}

export function addExpense(roomCode, expenseData) {
  return unwrap(api.post(`/rooms/${roomCode}/expenses`, expenseData))
}

export function deleteExpense(roomCode, expenseId) {
  return unwrap(api.delete(`/rooms/${roomCode}/expenses/${expenseId}`))
}
