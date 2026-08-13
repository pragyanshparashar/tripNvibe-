import { formatCurrency, formatDateRange, tripDurationInDays } from '../../utils/format'

function StatBlock({ label, value }) {
  if (!value) return null
  return (
    <div>
      <dt className="font-body text-xs font-semibold uppercase tracking-wide text-navy-400">{label}</dt>
      <dd className="mt-1 font-display text-base font-semibold text-navy-900">{value}</dd>
    </div>
  )
}

export default function TripOverview({ itinerary, preferences }) {
  const duration = tripDurationInDays(preferences?.tripDates?.startDate, preferences?.tripDates?.endDate)

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <h2 className="font-display text-2xl font-bold text-navy-900">{itinerary.title}</h2>
      {itinerary.summary && <p className="mt-3 font-body text-navy-600">{itinerary.summary}</p>}

      <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-navy-900/5 pt-6 sm:grid-cols-3">
        <StatBlock label="Destination" value={preferences?.destination} />
        <StatBlock
          label="Dates"
          value={formatDateRange(preferences?.tripDates?.startDate, preferences?.tripDates?.endDate)}
        />
        <StatBlock label="Duration" value={duration ? `${duration} days` : itinerary.dayWisePlan?.length ? `${itinerary.dayWisePlan.length} days` : null} />
        <StatBlock label="Group size" value={preferences?.groupSize ? `${preferences.groupSize} people` : null} />
        <StatBlock label="Vibe" value={preferences?.vibeType} />
        <StatBlock label="Estimated cost" value={formatCurrency(itinerary.estimatedCost)} />
      </dl>

      {(itinerary.hotelSuggestion || itinerary.transportation || itinerary.restaurants?.length > 0) && (
        <div className="mt-6 grid gap-4 border-t border-navy-900/5 pt-6 sm:grid-cols-3">
          {itinerary.hotelSuggestion && (
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-navy-400">🏨 Stay</p>
              <p className="mt-1 font-body text-sm text-navy-700">{itinerary.hotelSuggestion}</p>
            </div>
          )}
          {itinerary.transportation && (
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-navy-400">🚗 Getting around</p>
              <p className="mt-1 font-body text-sm text-navy-700">{itinerary.transportation}</p>
            </div>
          )}
          {itinerary.restaurants?.length > 0 && (
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wide text-navy-400">🍽️ Food</p>
              <p className="mt-1 font-body text-sm text-navy-700">{itinerary.restaurants.join(', ')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
