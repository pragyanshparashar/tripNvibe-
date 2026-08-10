import ActivityItem from './ActivityItem'

export default function DayPlan({ day }) {
  const activities = Array.isArray(day.activities) ? day.activities : []

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sunset font-display font-bold text-white">
          {day.day}
        </div>
        <h3 className="font-display text-lg font-semibold text-deep-900">Day {day.day}</h3>
      </div>

      {activities.length > 0 ? (
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </ul>
      ) : (
        <p className="font-body text-sm text-deep-400">No activities listed for this day.</p>
      )}
    </div>
  )
}
