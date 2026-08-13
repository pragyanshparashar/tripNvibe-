import { formatCurrency, formatDateRange } from '../../utils/format'

const avatarColors = ['bg-teal-500', 'bg-navy-600', 'bg-amber-500', 'bg-navy-400', 'bg-teal-600']

function initials(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || '?'
}

export default function HeroSummaryCard({ room }) {
  const dateRange = formatDateRange(room.tripDates?.startDate, room.tripDates?.endDate)
  const totalSpent = (room.expenses || []).reduce((sum, expense) => sum + expense.amount, 0)
  const participants = room.participants || []

  return (
    <div className="glass-dark bg-brand p-8">
      <p className="font-body text-xs font-semibold uppercase tracking-wide text-cream-100/70">
        Your trip
      </p>
      <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{room.destination}</h1>
      <p className="mt-2 font-body text-cream-100/85">{dateRange}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-3">
        <div>
          <p className="font-body text-xs uppercase tracking-wide text-cream-100/60">Budget</p>
          <p className="mt-1 font-display text-lg font-bold">{formatCurrency(room.budget)}</p>
        </div>
        <div>
          <p className="font-body text-xs uppercase tracking-wide text-cream-100/60">Spent so far</p>
          <p className="mt-1 font-display text-lg font-bold">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className="font-body text-xs uppercase tracking-wide text-cream-100/60">
            Group ({participants.length})
          </p>
          <div className="mt-1.5 flex -space-x-2">
            {participants.map((participant, index) => (
              <span
                key={`${participant.name}-${index}`}
                title={participant.name}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-navy-900/40 font-display text-xs font-bold text-white ${avatarColors[index % avatarColors.length]}`}
              >
                {initials(participant.name)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
