import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import { createRoom } from '../services/roomService'
import { formatCurrency, formatDateRange } from '../utils/format'
import Button from '../components/common/Button'
import ErrorState from '../components/common/ErrorState'
import EmptyState from '../components/common/EmptyState'
import ShareRoomPanel from '../components/room/ShareRoomPanel'

export default function CreateRoomPage() {
  const navigate = useNavigate()
  const { preferences, selectedItinerary, room, setRoom } = useTrip()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState(null)

  if (!selectedItinerary && !room) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <EmptyState
          icon="🗺️"
          title="No itinerary selected yet"
          message="Pick a trip option before creating a room."
          action={
            <Button variant="primary" onClick={() => navigate('/itineraries')}>
              Browse itineraries
            </Button>
          }
        />
      </div>
    )
  }

  async function handleCreateRoom() {
    setIsCreating(true)
    setError(null)
    try {
      const createdRoom = await createRoom({
        organizerName: preferences.organizerName,
        destination: preferences.destination,
        tripDates: preferences.tripDates,
        vibeType: preferences.vibeType,
        budget: Number(preferences.budget),
        groupSize: Number(preferences.groupSize),
        selectedTrip: selectedItinerary,
      })
      setRoom(createdRoom)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsCreating(false)
    }
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleCreateRoom} />
  }

  if (room) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="mb-3 text-5xl">🎉</div>
        <h1 className="font-display text-3xl font-bold text-deep-900">Your room is ready!</h1>
        <p className="mt-2 font-body text-deep-500">
          Share the code below so your friends can join {room.destination}.
        </p>

        <div className="mt-8">
          <ShareRoomPanel roomCode={room.roomCode} />
        </div>

        <Button variant="primary" size="lg" className="mt-8" onClick={() => navigate(`/room/${room.roomCode}`)}>
          Continue to Room →
        </Button>
      </div>
    )
  }

  const dateRange = formatDateRange(preferences.tripDates.startDate, preferences.tripDates.endDate)

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="font-display text-3xl font-bold text-deep-900">Create your trip room</h1>
      <p className="mt-2 font-body text-deep-500">Confirm the details below to bring your friends in.</p>

      <div className="mt-8 rounded-3xl bg-white p-8 text-left shadow-soft">
        <h2 className="font-display text-xl font-bold text-deep-900">{selectedItinerary.title}</h2>
        <dl className="mt-4 space-y-2 font-body text-sm text-deep-600">
          <div className="flex justify-between">
            <dt>Destination</dt>
            <dd className="font-semibold text-deep-900">{preferences.destination}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Dates</dt>
            <dd className="font-semibold text-deep-900">{dateRange}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Group size</dt>
            <dd className="font-semibold text-deep-900">{preferences.groupSize} people</dd>
          </div>
          <div className="flex justify-between">
            <dt>Estimated cost</dt>
            <dd className="font-semibold text-deep-900">{formatCurrency(selectedItinerary.estimatedCost)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Organizer</dt>
            <dd className="font-semibold text-deep-900">{preferences.organizerName}</dd>
          </div>
        </dl>
      </div>

      <Button variant="primary" size="lg" className="mt-8" onClick={handleCreateRoom} disabled={isCreating}>
        {isCreating ? 'Creating room…' : 'Create Trip Room →'}
      </Button>
    </div>
  )
}
