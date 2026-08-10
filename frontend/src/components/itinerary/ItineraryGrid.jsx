import ItineraryCard from './ItineraryCard'

export default function ItineraryGrid({ itineraries, selectedIndices, onView, onToggleSelect }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {itineraries.map((itinerary, index) => (
        <ItineraryCard
          key={index}
          itinerary={itinerary}
          index={index}
          isSelected={selectedIndices.includes(index)}
          onView={() => onView(index)}
          onToggleSelect={() => onToggleSelect(index)}
        />
      ))}
    </div>
  )
}
