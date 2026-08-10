const features = [
  {
    emoji: '🧠',
    title: 'AI itinerary generation',
    description: 'Multiple complete trip plans, tailored to your budget and vibe — built in seconds, not hours of research.',
  },
  {
    emoji: '🏠',
    title: 'Collaborative rooms',
    description: 'One shareable link brings your whole crew into the same planning space, no accounts required.',
  },
  {
    emoji: '🤝',
    title: 'Group decision-making',
    description: 'Vote on itineraries so the trip reflects what everyone actually wants, not just the loudest planner.',
  },
  {
    emoji: '🗺️',
    title: 'Full trip management',
    description: 'From day-by-day plans to expenses and payments — everything for the trip lives in one room.',
  },
]

export default function FeatureGrid() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold text-deep-900 sm:text-4xl">
          Built for planning trips with people
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl bg-white p-8 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-200 text-2xl">
                {feature.emoji}
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-deep-900">{feature.title}</h3>
              <p className="mt-2 font-body text-sm text-deep-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
