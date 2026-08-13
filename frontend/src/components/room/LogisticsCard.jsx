export default function LogisticsCard({ selectedTrip }) {
  const hasLogistics =
    selectedTrip?.hotelSuggestion || selectedTrip?.transportation || selectedTrip?.restaurants?.length > 0

  if (!hasLogistics) return null

  return (
    <div className="glass-strong p-6 sm:p-8">
      <h2 className="mb-5 font-display text-xl font-bold text-navy-900">Logistics &amp; Details</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {selectedTrip.hotelSuggestion && (
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-navy-400">🏨 Stay</p>
            <p className="mt-1 font-body text-sm text-navy-700">{selectedTrip.hotelSuggestion}</p>
          </div>
        )}
        {selectedTrip.transportation && (
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-navy-400">🚗 Getting around</p>
            <p className="mt-1 font-body text-sm text-navy-700">{selectedTrip.transportation}</p>
          </div>
        )}
        {selectedTrip.restaurants?.length > 0 && (
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-navy-400">🍽️ Food</p>
            <p className="mt-1 font-body text-sm text-navy-700">{selectedTrip.restaurants.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
