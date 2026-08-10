import { useNavigate } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import ItineraryGrid from '../components/itinerary/ItineraryGrid'
import EmptyState from '../components/common/EmptyState'
import Button from '../components/common/Button'

export default function ItineraryResultsPage() {
  const navigate = useNavigate()
  const { itineraryOptions, selectedIndex, preferences } = useTrip()

  if (itineraryOptions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <EmptyState
          icon="🧳"
          title="No trip options yet"
          message="Run a Vibe Check first and we'll generate some options for you."
          action={
            <Button variant="primary" onClick={() => navigate('/vibe-check')}>
              Start Vibe Check
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-deep-900 sm:text-4xl">
          Your trip options for {preferences.destination}
        </h1>
        <p className="mt-3 font-body text-deep-500">
          TripnVibe&rsquo;s AI built {itineraryOptions.length} option{itineraryOptions.length > 1 ? 's' : ''} for your group.
          Tap one to see the full plan.
        </p>
      </div>

      <ItineraryGrid
        itineraries={itineraryOptions}
        selectedIndex={selectedIndex}
        onView={(index) => navigate(`/itineraries/${index}`)}
      />
    </div>
  )
}
