import { useState } from 'react'
import Button from '../common/Button'

export default function FinalizeVotingControl({ tripOptions, leadingIndex, onFinalize, isSubmitting }) {
  const [choiceIndex, setChoiceIndex] = useState(leadingIndex)

  return (
    <div className="rounded-3xl bg-night p-6 text-cream-50 shadow-soft">
      <p className="font-body text-xs font-semibold uppercase tracking-wide text-navy-200">
        Organizer action
      </p>
      <h3 className="mt-1 font-display text-lg font-bold">Ready to close voting?</h3>
      <p className="mt-1 font-body text-sm text-navy-100">
        Pick the winning itinerary — the current leader is pre-selected.
      </p>

      <select
        value={choiceIndex}
        onChange={(event) => setChoiceIndex(Number(event.target.value))}
        className="mt-4 w-full rounded-xl border-2 border-white/20 bg-white/10 px-4 py-3 font-body text-sm text-cream-50 outline-none focus:border-teal-400"
      >
        {tripOptions.map((option, index) => (
          <option key={index} value={index} className="text-navy-900">
            {option.title}
          </option>
        ))}
      </select>

      <Button
        variant="primary"
        className="mt-4 w-full"
        onClick={() => onFinalize(choiceIndex)}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Finalizing…' : 'Finalize this trip →'}
      </Button>
    </div>
  )
}
