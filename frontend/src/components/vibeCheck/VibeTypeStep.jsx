const vibes = [
  { value: 'Adventure', emoji: '🏔️' },
  { value: 'Relaxation', emoji: '🌊' },
  { value: 'Party', emoji: '🎉' },
  { value: 'Culture', emoji: '🏛️' },
  { value: 'Nature', emoji: '🌿' },
  { value: 'Luxury', emoji: '✨' },
  { value: 'Backpacking', emoji: '🎒' },
  { value: 'Food', emoji: '🍜' },
]

export default function VibeTypeStep({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {vibes.map((vibe) => (
        <button
          key={vibe.value}
          type="button"
          onClick={() => onChange(vibe.value)}
          className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-5 transition-all ${
            value === vibe.value
              ? 'border-coral-500 bg-coral-50 shadow-soft'
              : 'border-deep-900/10 bg-white hover:border-coral-300'
          }`}
        >
          <span className="text-3xl">{vibe.emoji}</span>
          <span className="font-body text-sm font-semibold text-deep-800">{vibe.value}</span>
        </button>
      ))}
    </div>
  )
}
