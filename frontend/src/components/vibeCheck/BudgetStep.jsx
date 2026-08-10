const presets = [15000, 30000, 50000, 80000]

export default function BudgetStep({ value, onChange }) {
  return (
    <div>
      <div className="relative">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-display text-xl text-deep-400">
          ₹
        </span>
        <input
          id="budget"
          type="number"
          min="1"
          autoFocus
          placeholder="30000"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border-2 border-deep-900/10 bg-white py-4 pl-12 pr-6 text-center font-display text-xl text-deep-900 shadow-soft outline-none transition-colors focus:border-coral-500"
        />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {presets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(String(preset))}
            className={`rounded-full border-2 px-4 py-1.5 font-body text-sm font-medium transition-colors ${
              String(value) === String(preset)
                ? 'border-coral-500 bg-coral-50 text-coral-600'
                : 'border-deep-900/10 bg-white text-deep-500 hover:border-coral-300'
            }`}
          >
            ₹{preset.toLocaleString('en-IN')}
          </button>
        ))}
      </div>
    </div>
  )
}
