export default function ActivityItem({ activity }) {
  if (typeof activity === 'string') {
    return (
      <li className="flex gap-3 rounded-2xl bg-cream-100 px-4 py-3">
        <span className="text-teal-500">•</span>
        <span className="font-body text-sm text-navy-700">{activity}</span>
      </li>
    )
  }

  if (activity && typeof activity === 'object') {
    const { time, location, activity: activityText, ...rest } = activity
    const extras = Object.entries(rest).filter(([, val]) => val !== null && val !== undefined && val !== '')

    return (
      <li className="rounded-2xl bg-cream-100 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {time && (
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2.5 py-0.5 font-body text-xs font-semibold text-teal-700">
              🕐 {time}
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1 rounded-full bg-navy-100 px-2.5 py-0.5 font-body text-xs font-semibold text-navy-700">
              📍 {location}
            </span>
          )}
        </div>
        {activityText && (
          <p className="mt-2 font-body text-sm text-navy-700">{activityText}</p>
        )}
        {extras.length > 0 && (
          <dl className="mt-1 space-y-0.5">
            {extras.map(([key, val]) => (
              <div key={key} className="font-body text-xs text-navy-500">
                {String(val)}
              </div>
            ))}
          </dl>
        )}
      </li>
    )
  }

  return null
}
