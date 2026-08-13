function firstLocation(day) {
  const firstStructured = day.activities?.find((activity) => activity && typeof activity === 'object' && activity.location)
  return firstStructured?.location || null
}

export default function DummyMapCard({ selectedTrip }) {
  const days = Array.isArray(selectedTrip?.dayWisePlan) ? selectedTrip.dayWisePlan : []

  return (
    <div className="glass-strong overflow-hidden border-2 border-dashed border-teal-300/60 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-xl font-bold text-navy-900">🗺️ Mission Control</h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 font-body text-xs font-semibold text-amber-600">
          Preview — coming soon
        </span>
      </div>
      <p className="mt-1 font-body text-sm text-navy-500">
        A live trip dashboard with real maps and real-time tracking is on the way. Here&rsquo;s a preview of what it&rsquo;ll show.
      </p>

      <div
        className="relative mt-5 overflow-hidden rounded-2xl bg-navy-800 p-6"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      >
        {days.length > 0 ? (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
            {days.map((day, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand font-display text-xs font-bold text-white shadow-lift">
                    D{day.day}
                  </span>
                  <span className="mt-1 max-w-[6rem] truncate font-body text-[11px] text-cream-100/80">
                    {firstLocation(day) || `Day ${day.day}`}
                  </span>
                </div>
                {index < days.length - 1 && (
                  <span className="mb-4 h-px w-8 border-t-2 border-dashed border-white/25" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-sm text-cream-100/70">Route preview will appear once your itinerary is finalized.</p>
        )}
      </div>
    </div>
  )
}
