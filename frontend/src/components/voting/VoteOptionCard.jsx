import { formatCurrency } from '../../utils/format'

export default function VoteOptionCard({ itinerary, index, voteCount, totalVotes, isMyVote, onVote }) {
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0
  const dayCount = itinerary.dayWisePlan?.length

  return (
    <div
      className={`rounded-3xl bg-white p-6 shadow-soft transition-all ${
        isMyVote ? 'ring-2 ring-coral-500' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-bold text-deep-900">{itinerary.title}</h3>
          {dayCount ? <p className="font-body text-xs text-deep-400">{dayCount} days</p> : null}
        </div>
        <span className="shrink-0 font-display text-lg font-bold text-coral-600">
          {formatCurrency(itinerary.estimatedCost)}
        </span>
      </div>

      {itinerary.summary && (
        <p className="mt-2 font-body text-sm text-deep-500 line-clamp-2">{itinerary.summary}</p>
      )}

      <div className="mt-4">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-cream-200">
          <div
            className="h-full rounded-full bg-sunset transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-1.5 font-body text-xs font-medium text-deep-500">
          {voteCount} vote{voteCount === 1 ? '' : 's'} &middot; {percentage}%
        </p>
      </div>

      <button
        type="button"
        onClick={() => onVote(index)}
        className={`mt-4 w-full rounded-full py-2.5 font-display text-sm font-semibold transition-colors ${
          isMyVote
            ? 'bg-coral-500 text-white'
            : 'bg-cream-200 text-deep-800 hover:bg-coral-100 hover:text-coral-700'
        }`}
      >
        {isMyVote ? '✓ Your vote' : 'Vote for this'}
      </button>
    </div>
  )
}
