import { formatCurrency } from '../../utils/format'

const accentClasses = [
  'from-coral-400 to-amber-400',
  'from-deep-500 to-deep-700',
  'from-coral-500 to-deep-600',
  'from-amber-500 to-coral-600',
]

export default function ItineraryCard({ itinerary, index, onView, onToggleSelect, isSelected }) {
  const accent = accentClasses[index % accentClasses.length]
  const dayCount = itinerary.dayWisePlan?.length

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift ${
        isSelected ? 'ring-2 ring-coral-500' : ''
      }`}
    >
      <div className={`relative bg-gradient-to-br ${accent} px-6 py-8 text-white`}>
        <button
          type="button"
          onClick={onToggleSelect}
          aria-pressed={isSelected}
          aria-label={isSelected ? 'Remove from shortlist' : 'Add to shortlist'}
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
            isSelected
              ? 'border-white bg-white text-coral-600'
              : 'border-white/60 bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {isSelected ? '✓' : ''}
        </button>

        {isSelected && (
          <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            ✓ Shortlisted
          </span>
        )}
        <h3 className="max-w-[80%] font-display text-2xl font-bold">{itinerary.title}</h3>
        {dayCount ? (
          <p className="mt-1 font-body text-sm text-white/80">{dayCount} days</p>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        {itinerary.summary && (
          <p className="font-body text-sm text-deep-600 line-clamp-3">{itinerary.summary}</p>
        )}

        <div className="mt-4 font-display text-2xl font-bold text-deep-900">
          {formatCurrency(itinerary.estimatedCost)}
        </div>

        <button
          type="button"
          onClick={onView}
          className="mt-6 inline-flex items-center justify-center gap-1 rounded-full bg-cream-200 py-3 font-display text-sm font-semibold text-deep-800 transition-colors hover:bg-coral-100 hover:text-coral-700"
        >
          View Full Itinerary →
        </button>
      </div>
    </div>
  )
}
