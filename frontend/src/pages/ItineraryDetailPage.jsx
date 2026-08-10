import { useNavigate, useParams } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import TripOverview from '../components/itinerary/TripOverview'
import DayPlan from '../components/itinerary/DayPlan'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'

export default function ItineraryDetailPage() {
  const navigate = useNavigate()
  const { index } = useParams()
  const { itineraryOptions, preferences, selectedIndex, selectItinerary } = useTrip()

  const itineraryIndex = Number(index)
  const itinerary = itineraryOptions[itineraryIndex]

  if (!itinerary) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <EmptyState
          icon="🔍"
          title="Itinerary not found"
          message="This trip option isn't available. Head back to see your options."
          action={
            <Button variant="primary" onClick={() => navigate('/itineraries')}>
              Back to options
            </Button>
          }
        />
      </div>
    )
  }

  const isSelected = selectedIndex === itineraryIndex
  const dayWisePlan = Array.isArray(itinerary.dayWisePlan) ? itinerary.dayWisePlan : []

  function handleSelect() {
    selectItinerary(itineraryIndex)
    navigate('/room/create')
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <button
        type="button"
        onClick={() => navigate('/itineraries')}
        className="mb-6 inline-flex items-center gap-1 font-body text-sm font-semibold text-deep-500 hover:text-coral-600"
      >
        ← Back to all options
      </button>

      <TripOverview itinerary={itinerary} preferences={preferences} />

      {dayWisePlan.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-5 font-display text-2xl font-bold text-deep-900">Day-by-day plan</h2>
          <div className="space-y-5">
            {dayWisePlan.map((day, dayIndex) => (
              <DayPlan key={dayIndex} day={day} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl bg-white p-8 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="font-display text-lg font-semibold text-deep-900">
            {isSelected ? "You've selected this itinerary" : 'Like this one?'}
          </h3>
          <p className="font-body text-sm text-deep-500">
            {isSelected
              ? 'Continue to create your trip room.'
              : 'Select it to move on to creating your trip room.'}
          </p>
        </div>
        <Button variant="primary" size="lg" onClick={handleSelect}>
          {isSelected ? 'Continue to Room →' : '✓ Select this itinerary'}
        </Button>
      </div>
    </div>
  )
}
