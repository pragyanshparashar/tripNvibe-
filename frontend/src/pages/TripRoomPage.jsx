import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRoom } from '../services/roomService'
import { formatCurrency } from '../utils/format'
import LoadingScreen from '../components/common/LoadingScreen'
import ErrorState from '../components/common/ErrorState'
import EmptyState from '../components/common/EmptyState'
import RoomHeader from '../components/room/RoomHeader'
import ParticipantList from '../components/room/ParticipantList'
import ShareRoomPanel from '../components/room/ShareRoomPanel'

const POLL_INTERVAL_MS = 6000

export default function TripRoomPage() {
  const { roomCode } = useParams()
  const [room, setRoom] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    function fetchRoom() {
      getRoom(roomCode)
        .then((data) => {
          if (!isMounted) return
          setRoom(data)
          setError(null)
        })
        .catch((err) => {
          if (!isMounted) return
          setError(err.message)
        })
        .finally(() => {
          if (!isMounted) return
          setIsLoading(false)
        })
    }

    fetchRoom()
    const interval = setInterval(fetchRoom, POLL_INTERVAL_MS)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [roomCode])

  if (isLoading) {
    return <LoadingScreen title="Loading your room" messages={['Fetching the latest trip details…']} />
  }

  if (error || !room) {
    return <ErrorState title="Room not found" message={error || 'This room code doesn\'t exist.'} />
  }

  const selectedTrip = room.selectedTrip

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <RoomHeader room={room} />

      {selectedTrip && (
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-soft">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-deep-400">
            Selected itinerary
          </p>
          <h2 className="mt-1 font-display text-xl font-bold text-deep-900">{selectedTrip.title}</h2>
          {selectedTrip.summary && (
            <p className="mt-2 font-body text-sm text-deep-600">{selectedTrip.summary}</p>
          )}
          {typeof selectedTrip.estimatedCost === 'number' && (
            <p className="mt-3 font-display text-lg font-bold text-coral-600">
              {formatCurrency(selectedTrip.estimatedCost)}
            </p>
          )}
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-4 font-display text-xl font-bold text-deep-900">
          Participants ({room.participants?.length || 0})
        </h2>
        {room.participants?.length > 0 ? (
          <ParticipantList participants={room.participants} organizerName={room.organizerName} />
        ) : (
          <EmptyState icon="👋" title="Waiting for friends to join" />
        )}
      </div>

      <div className="mt-8">
        <ShareRoomPanel roomCode={room.roomCode} />
      </div>
    </div>
  )
}
