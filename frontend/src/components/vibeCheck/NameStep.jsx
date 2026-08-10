export default function NameStep({ value, onChange }) {
  return (
    <div>
      <label htmlFor="organizerName" className="sr-only">
        Your name
      </label>
      <input
        id="organizerName"
        type="text"
        autoFocus
        placeholder="e.g. Pragyansh"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border-2 border-deep-900/10 bg-white px-6 py-4 text-center font-display text-xl text-deep-900 shadow-soft outline-none transition-colors focus:border-coral-500"
      />
    </div>
  )
}
