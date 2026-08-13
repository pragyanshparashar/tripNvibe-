import { useNavigate, useParams } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import ItineraryFullDetail from '../components/itinerary/ItineraryFullDetail'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'

export default function ItineraryDetailPage() {
  const navigate = useNavigate()
  const { index } = useParams()
  const { itineraryOptions, preferences, selectedIndices, toggleItinerarySelection } = useTrip()

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

  const isSelected = selectedIndices.includes(itineraryIndex)

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <button
        type="button"
        onClick={() => navigate('/itineraries')}
        className="mb-6 inline-flex items-center gap-1 font-body text-sm font-semibold text-navy-500 hover:text-teal-600"
      >
        ← Back to all options
      </button>

      <ItineraryFullDetail itinerary={itinerary} tripInfo={preferences} />

      <div className="glass-strong mt-10 flex flex-col items-center gap-3 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="font-display text-lg font-semibold text-navy-900">
            {isSelected ? "This one's on your shortlist" : 'Like this one?'}
          </h3>
          <p className="font-body text-sm text-navy-500">
            {isSelected
              ? 'Add more options for the group to vote on, or continue to create your room.'
              : 'Add it to your shortlist — pick more than one to let the group vote.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={isSelected ? 'outline' : 'primary'}
            size="lg"
            onClick={() => toggleItinerarySelection(itineraryIndex)}
          >
            {isSelected ? 'Remove from shortlist' : '✓ Add to shortlist'}
          </Button>
          {isSelected && (
            <Button variant="secondary" size="lg" onClick={() => navigate('/room/create')}>
              Continue to Room →
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
