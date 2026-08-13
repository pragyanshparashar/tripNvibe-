import TripOverview from './TripOverview'
import DayPlan from './DayPlan'

export default function ItineraryFullDetail({ itinerary, tripInfo, enablePhotos = false }) {
  const dayWisePlan = Array.isArray(itinerary.dayWisePlan) ? itinerary.dayWisePlan : []

  return (
    <div>
      <TripOverview itinerary={itinerary} preferences={tripInfo} />

      {dayWisePlan.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-5 font-display text-2xl font-bold text-navy-900">Day-by-day plan</h2>
          <div className="space-y-5">
            {dayWisePlan.map((day, dayIndex) => (
              <DayPlan
                key={dayIndex}
                day={day}
                destination={enablePhotos ? tripInfo?.destination : undefined}
                collapsible={enablePhotos}
                defaultExpanded={!enablePhotos}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
