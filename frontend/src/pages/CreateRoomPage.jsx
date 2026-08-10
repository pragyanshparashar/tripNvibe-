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
  const { preferences, selectedItineraries, room, setRoom, setMyName } = useTrip()
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState(null)

  if (selectedItineraries.length === 0 && !room) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <EmptyState
          icon="🗺️"
          title="No itinerary shortlisted yet"
          message="Pick at least one trip option before creating a room."
          action={
            <Button variant="primary" onClick={() => navigate('/itineraries')}>
              Browse itineraries
            </Button>
          }
        />
      </div>
    )
  }

  const isShortlist = selectedItineraries.length > 1

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
        selectedTrip: isShortlist ? null : selectedItineraries[0],
        tripOptions: isShortlist ? selectedItineraries : [],
      })
      setMyName(preferences.organizerName)
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
          {room.roomStatus === 'voting'
            ? `Share the code below so your friends can join and vote on ${room.destination}.`
            : `Share the code below so your friends can join ${room.destination}.`}
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
      <p className="mt-2 font-body text-deep-500">
        {isShortlist
          ? 'Your friends will vote among these options once they join.'
          : 'Confirm the details below to bring your friends in.'}
      </p>

      <div className="mt-8 space-y-4 text-left">
        {selectedItineraries.map((itinerary) => (
          <div key={itinerary.title} className="rounded-3xl bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-lg font-bold text-deep-900">{itinerary.title}</h2>
              <span className="shrink-0 font-display text-lg font-bold text-coral-600">
                {formatCurrency(itinerary.estimatedCost)}
              </span>
            </div>
            {itinerary.summary && (
              <p className="mt-1 font-body text-sm text-deep-500 line-clamp-2">{itinerary.summary}</p>
            )}
          </div>
        ))}

        <div className="rounded-3xl bg-white p-6 shadow-soft">
          <dl className="space-y-2 font-body text-sm text-deep-600">
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
              <dt>Organizer</dt>
              <dd className="font-semibold text-deep-900">{preferences.organizerName}</dd>
            </div>
          </dl>
        </div>
      </div>

      <Button variant="primary" size="lg" className="mt-8" onClick={handleCreateRoom} disabled={isCreating}>
        {isCreating ? 'Creating room…' : 'Create Trip Room →'}
      </Button>
    </div>
  )
}
