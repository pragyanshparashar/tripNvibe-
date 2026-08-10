function toTitleCase(key) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())
}

export default function ActivityItem({ activity }) {
  if (typeof activity === 'string') {
    return (
      <li className="flex gap-3 rounded-2xl bg-cream-100 px-4 py-3">
        <span className="text-coral-500">•</span>
        <span className="font-body text-sm text-deep-700">{activity}</span>
      </li>
    )
  }

  if (activity && typeof activity === 'object') {
    const entries = Object.entries(activity).filter(([, val]) => val !== null && val !== undefined && val !== '')
    return (
      <li className="rounded-2xl bg-cream-100 px-4 py-3">
        <dl className="space-y-1">
          {entries.map(([key, val]) => (
            <div key={key} className="flex gap-2 font-body text-sm">
              <dt className="shrink-0 font-semibold text-deep-800">{toTitleCase(key)}:</dt>
              <dd className="text-deep-600">{String(val)}</dd>
            </div>
          ))}
        </dl>
      </li>
    )
  }

  return null
}
