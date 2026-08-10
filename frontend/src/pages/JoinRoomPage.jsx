import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import { joinRoom } from '../services/roomService'
import Button from '../components/common/Button'

export default function JoinRoomPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setRoom } = useTrip()

  const [roomCode, setRoomCode] = useState((searchParams.get('code') || '').toUpperCase())
  const [participantName, setParticipantName] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState(null)

  const canSubmit = roomCode.trim().length === 6 && participantName.trim().length > 0

  async function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) return

    setIsJoining(true)
    setError(null)
    try {
      const room = await joinRoom(roomCode.trim().toUpperCase(), participantName.trim())
      setRoom(room)
      navigate(`/room/${room.roomCode}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <div className="text-center">
        <div className="text-4xl">🔑</div>
        <h1 className="mt-3 font-display text-3xl font-bold text-deep-900">Join a trip room</h1>
        <p className="mt-2 font-body text-deep-500">Enter the room code your friend shared with you.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div>
          <label htmlFor="roomCode" className="mb-2 block font-body text-sm font-semibold text-deep-600">
            Room code
          </label>
          <input
            id="roomCode"
            type="text"
            maxLength={6}
            autoFocus
            placeholder="ABCD12"
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
            className="w-full rounded-2xl border-2 border-deep-900/10 bg-white px-6 py-4 text-center font-display text-2xl tracking-[0.3em] text-deep-900 shadow-soft outline-none transition-colors focus:border-coral-500"
          />
        </div>

        <div>
          <label htmlFor="participantName" className="mb-2 block font-body text-sm font-semibold text-deep-600">
            Your name
          </label>
          <input
            id="participantName"
            type="text"
            placeholder="e.g. Rahul"
            value={participantName}
            onChange={(event) => setParticipantName(event.target.value)}
            className="w-full rounded-2xl border-2 border-deep-900/10 bg-white px-6 py-4 text-center font-display text-lg text-deep-900 shadow-soft outline-none transition-colors focus:border-coral-500"
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-coral-50 px-4 py-3 text-center font-body text-sm font-medium text-coral-700">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!canSubmit || isJoining}
        >
          {isJoining ? 'Joining…' : 'Join Room →'}
        </Button>
      </form>
    </div>
  )
}
