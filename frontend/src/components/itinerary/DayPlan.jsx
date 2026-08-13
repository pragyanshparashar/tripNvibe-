import { useState } from 'react'
import ActivityItem from './ActivityItem'
import { usePhoto } from '../../hooks/usePhoto'

export default function DayPlan({ day, destination, defaultExpanded = true, collapsible = false }) {
  const activities = Array.isArray(day.activities) ? day.activities : []
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const photoQuery = destination ? `${destination} travel` : null
  const { photo, isLoading } = usePhoto(collapsible ? photoQuery : null)
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = photo && !photoFailed

  return (
    <div className="glass-strong overflow-hidden">
      <button
        type="button"
        onClick={() => collapsible && setIsExpanded((current) => !current)}
        className={`flex w-full items-center gap-3 p-6 text-left ${collapsible ? 'cursor-pointer' : ''}`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand font-display font-bold text-white">
          {day.day}
        </div>
        <h3 className="flex-1 font-display text-lg font-semibold text-navy-900">Day {day.day}</h3>
        {collapsible && (
          <span className={`text-navy-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▾</span>
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          {collapsible && (
            <div className={`mb-4 h-36 w-full overflow-hidden rounded-2xl ${isLoading ? 'shimmer-bg' : 'bg-teal-100'}`}>
              {showPhoto && (
                <img
                  src={photo.url}
                  alt={photo.alt}
                  onError={() => setPhotoFailed(true)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          )}

          {activities.length > 0 ? (
            <ul className="space-y-2">
              {activities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </ul>
          ) : (
            <p className="font-body text-sm text-navy-400">No activities listed for this day.</p>
          )}
        </div>
      )}
    </div>
  )
}
