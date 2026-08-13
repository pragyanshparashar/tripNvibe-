import { useNavigate } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import ItineraryGrid from '../components/itinerary/ItineraryGrid'
import EmptyState from '../components/common/EmptyState'
import Button from '../components/common/Button'

export default function ItineraryResultsPage() {
  const navigate = useNavigate()
  const { itineraryOptions, selectedIndices, toggleItinerarySelection, preferences } = useTrip()

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

  const hasSelection = selectedIndices.length > 0

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 pb-32">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          Your trip options for {preferences.destination}
        </h1>
        <p className="mt-3 font-body text-navy-500">
          TripnVibe&rsquo;s AI built {itineraryOptions.length} option{itineraryOptions.length > 1 ? 's' : ''} for your group.
          Tap the ✓ to shortlist one or more, or open one to see the full plan.
        </p>
      </div>

      <ItineraryGrid
        itineraries={itineraryOptions}
        selectedIndices={selectedIndices}
        onView={(index) => navigate(`/itineraries/${index}`)}
        onToggleSelect={toggleItinerarySelection}
      />

      {hasSelection && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-navy-900/5 bg-white/95 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <p className="font-body text-sm font-medium text-navy-700">
              {selectedIndices.length} {selectedIndices.length > 1 ? 'itineraries' : 'itinerary'} shortlisted
              {selectedIndices.length > 1 ? ' — your group will vote on these' : ''}
            </p>
            <Button variant="primary" onClick={() => navigate('/room/create')}>
              Continue with {selectedIndices.length} selected →
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
