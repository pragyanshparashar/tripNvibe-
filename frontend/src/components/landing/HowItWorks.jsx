const steps = [
  { emoji: '🎯', title: 'Tell us your vibe', description: 'Destination, dates, budget, group size, and the energy you want.' },
  { emoji: '🤖', title: 'AI builds your options', description: 'Gemini generates a handful of complete, day-by-day trip plans.' },
  { emoji: '👯', title: 'Bring your friends', description: 'Share a room code — everyone joins with zero sign-up.' },
  { emoji: '🗳️', title: 'Decide together', description: 'The group weighs in and one plan becomes the trip.' },
  { emoji: '🎒', title: 'Go make memories', description: 'Itinerary, expenses, and logistics — all in one place.' },
]

export default function HowItWorks() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl font-bold text-deep-900 sm:text-4xl">
          How it works
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-soft">
                {step.emoji}
              </div>
              <span className="mt-4 font-display text-xs font-bold uppercase tracking-wider text-coral-500">
                Step {index + 1}
              </span>
              <h3 className="mt-1 font-display text-base font-semibold text-deep-900">{step.title}</h3>
              <p className="mt-2 font-body text-sm text-deep-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
