import { useState } from 'react'
import { formatCurrency } from '../../utils/format'
import { usePhoto } from '../../hooks/usePhoto'

export default function VoteOptionCard({ itinerary, index, voteCount, totalVotes, isMyVote, onVote, onViewDetail }) {
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0
  const dayCount = itinerary.dayWisePlan?.length
  const { photo, isLoading } = usePhoto(itinerary.title)
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = photo && !photoFailed

  return (
    <div
      className={`glass-strong overflow-hidden transition-all ${
        isMyVote ? 'ring-2 ring-teal-500' : ''
      }`}
    >
      <button
        type="button"
        onClick={onViewDetail}
        className="block w-full text-left"
      >
        <div className={`h-32 w-full ${isLoading ? 'shimmer-bg' : 'bg-brand'}`}>
          {showPhoto && (
            <img
              src={photo.url}
              alt={photo.alt}
              onError={() => setPhotoFailed(true)}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="p-6 pb-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-bold text-navy-900">{itinerary.title}</h3>
              {dayCount ? <p className="font-body text-xs text-navy-400">{dayCount} days</p> : null}
            </div>
            <span className="shrink-0 font-display text-lg font-bold text-teal-600">
              {formatCurrency(itinerary.estimatedCost)}
            </span>
          </div>

          {itinerary.summary && (
            <p className="mt-2 font-body text-sm text-navy-500 line-clamp-2">{itinerary.summary}</p>
          )}
          <p className="mt-2 font-body text-xs font-semibold text-teal-600">View full itinerary →</p>
        </div>
      </button>

      <div className="p-6 pt-4">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-cream-200">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-1.5 font-body text-xs font-medium text-navy-500">
          {voteCount} vote{voteCount === 1 ? '' : 's'} &middot; {percentage}%
        </p>

        <button
          type="button"
          onClick={() => onVote(index)}
          className={`mt-4 w-full rounded-full py-2.5 font-display text-sm font-semibold transition-colors ${
            isMyVote
              ? 'bg-teal-500 text-white'
              : 'bg-cream-200 text-navy-800 hover:bg-teal-100 hover:text-teal-700'
          }`}
        >
          {isMyVote ? '✓ Your vote' : 'Vote for this'}
        </button>
      </div>
    </div>
  )
}
