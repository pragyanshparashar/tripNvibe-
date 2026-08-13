import { useState } from 'react'
import { formatCurrency } from '../../utils/format'
import { usePhoto } from '../../hooks/usePhoto'

const accentClasses = [
  'from-teal-400 to-amber-400',
  'from-navy-500 to-navy-700',
  'from-teal-500 to-navy-600',
  'from-amber-500 to-teal-600',
]

export default function ItineraryCard({ itinerary, index, onView, onToggleSelect, isSelected }) {
  const accent = accentClasses[index % accentClasses.length]
  const dayCount = itinerary.dayWisePlan?.length
  const { photo, isLoading } = usePhoto(itinerary.title)
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = photo && !photoFailed

  return (
    <div
      className={`group glass-strong flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift ${
        isSelected ? 'ring-2 ring-teal-500' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br px-6 py-8 text-white ${
          showPhoto ? '' : accent
        } ${isLoading ? 'shimmer-bg' : ''}`}
      >
        {showPhoto && (
          <>
            <img
              src={photo.url}
              alt={photo.alt}
              onError={() => setPhotoFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/25 to-navy-900/10" />
          </>
        )}

        <button
          type="button"
          onClick={onToggleSelect}
          aria-pressed={isSelected}
          aria-label={isSelected ? 'Remove from shortlist' : 'Add to shortlist'}
          className={`absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
            isSelected
              ? 'border-white bg-white text-teal-600'
              : 'border-white/60 bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {isSelected ? '✓' : ''}
        </button>

        <div className="relative">
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

        {showPhoto && photo?.photographerName && (
          <a
            href={photo.photographerUrl}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 mt-3 block font-body text-[10px] text-white/60 hover:text-white/90"
          >
            Photo: {photo.photographerName} on Unsplash
          </a>
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        {itinerary.summary && (
          <p className="font-body text-sm text-navy-600 line-clamp-3">{itinerary.summary}</p>
        )}

        <div className="mt-4 font-display text-2xl font-bold text-navy-900">
          {formatCurrency(itinerary.estimatedCost)}
        </div>

        <button
          type="button"
          onClick={onView}
          className="mt-6 inline-flex items-center justify-center gap-1 rounded-full bg-teal-50 py-3 font-display text-sm font-semibold text-navy-800 transition-colors hover:bg-teal-100 hover:text-teal-700"
        >
          View Full Itinerary →
        </button>
      </div>
    </div>
  )
}
