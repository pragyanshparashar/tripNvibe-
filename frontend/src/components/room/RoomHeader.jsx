import { formatCurrency, formatDateRange } from '../../utils/format'

export default function RoomHeader({ room }) {
  const dateRange = formatDateRange(room.tripDates?.startDate, room.tripDates?.endDate)

  return (
    <div className="rounded-3xl bg-dusk px-8 py-10 text-center text-cream-50 shadow-lift">
      <p className="font-body text-sm font-semibold uppercase tracking-wide text-deep-200">
        Trip Room
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{room.destination}</h1>
      <p className="mt-3 font-body text-deep-100">
        {[dateRange, room.groupSize ? `${room.groupSize} people` : null, formatCurrency(room.budget)]
          .filter(Boolean)
          .join(' • ')}
      </p>
      <p className="mt-1 font-body text-sm text-deep-200">Organized by {room.organizerName}</p>
    </div>
  )
}
