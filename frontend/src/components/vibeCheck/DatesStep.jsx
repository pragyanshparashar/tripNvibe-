export default function DatesStep({ value, onChange }) {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1 text-left">
        <label htmlFor="startDate" className="mb-2 block font-body text-sm font-semibold text-deep-600">
          Start date
        </label>
        <input
          id="startDate"
          type="date"
          min={today}
          value={value.startDate}
          onChange={(event) => onChange({ ...value, startDate: event.target.value })}
          className="w-full rounded-2xl border-2 border-deep-900/10 bg-white px-5 py-4 font-body text-deep-900 shadow-soft outline-none transition-colors focus:border-coral-500"
        />
      </div>
      <div className="flex-1 text-left">
        <label htmlFor="endDate" className="mb-2 block font-body text-sm font-semibold text-deep-600">
          End date
        </label>
        <input
          id="endDate"
          type="date"
          min={value.startDate || today}
          value={value.endDate}
          onChange={(event) => onChange({ ...value, endDate: event.target.value })}
          className="w-full rounded-2xl border-2 border-deep-900/10 bg-white px-5 py-4 font-body text-deep-900 shadow-soft outline-none transition-colors focus:border-coral-500"
        />
      </div>
    </div>
  )
}
