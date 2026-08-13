export default function GroupSizeStep({ value, onChange }) {
  const size = Number(value) || 0

  function decrement() {
    if (size > 1) onChange(String(size - 1))
  }

  function increment() {
    onChange(String(size + 1))
  }

  return (
    <div className="flex items-center justify-center gap-6">
      <button
        type="button"
        onClick={decrement}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl font-bold text-navy-700 shadow-soft transition-transform hover:-translate-y-0.5 active:translate-y-0"
        aria-label="Decrease group size"
      >
        −
      </button>
      <div className="font-display text-5xl font-bold text-navy-900" aria-live="polite">
        {size || '—'}
      </div>
      <button
        type="button"
        onClick={increment}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-2xl font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5 active:translate-y-0"
        aria-label="Increase group size"
      >
        +
      </button>
    </div>
  )
}
