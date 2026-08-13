import { useState } from 'react'
import Button from '../common/Button'

const categories = ['Flights', 'Hotel', 'Food', 'Activities', 'Transport', 'Other']

export default function AddExpenseForm({ participants, onAdd, onClose }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [paidBy, setPaidBy] = useState(participants[0]?.name || '')
  const [splitAmong, setSplitAmong] = useState(participants.map((p) => p.name))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canSubmit = description.trim() && Number(amount) > 0 && paidBy && splitAmong.length > 0

  function toggleSplit(name) {
    setSplitAmong((current) =>
      current.includes(name) ? current.filter((n) => n !== name) : [...current, name]
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!canSubmit) return

    setIsSubmitting(true)
    try {
      await onAdd({
        description: description.trim(),
        amount: Number(amount),
        category,
        paidBy,
        splitAmong,
      })
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-soft">
      <h3 className="font-display text-lg font-bold text-navy-900">Add an expense</h3>

      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="expenseDescription" className="mb-1.5 block font-body text-sm font-semibold text-navy-600">
            What was it for?
          </label>
          <input
            id="expenseDescription"
            type="text"
            placeholder="e.g. Hotel deposit"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full rounded-xl border-2 border-navy-900/10 px-4 py-2.5 font-body text-navy-900 outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label htmlFor="expenseAmount" className="mb-1.5 block font-body text-sm font-semibold text-navy-600">
            Amount (₹)
          </label>
          <input
            id="expenseAmount"
            type="number"
            min="1"
            placeholder="1000"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-xl border-2 border-navy-900/10 px-4 py-2.5 font-body text-navy-900 outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <p className="mb-1.5 font-body text-sm font-semibold text-navy-600">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={`rounded-full border-2 px-3 py-1.5 font-body text-sm transition-colors ${
                  category === option
                    ? 'border-teal-500 bg-teal-50 text-teal-600'
                    : 'border-navy-900/10 text-navy-500 hover:border-teal-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="expensePaidBy" className="mb-1.5 block font-body text-sm font-semibold text-navy-600">
            Paid by
          </label>
          <select
            id="expensePaidBy"
            value={paidBy}
            onChange={(event) => setPaidBy(event.target.value)}
            className="w-full rounded-xl border-2 border-navy-900/10 px-4 py-2.5 font-body text-navy-900 outline-none focus:border-teal-500"
          >
            {participants.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-1.5 font-body text-sm font-semibold text-navy-600">Split among</p>
          <div className="flex flex-wrap gap-2">
            {participants.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => toggleSplit(p.name)}
                className={`rounded-full border-2 px-3 py-1.5 font-body text-sm transition-colors ${
                  splitAmong.includes(p.name)
                    ? 'border-teal-500 bg-teal-50 text-teal-600'
                    : 'border-navy-900/10 text-navy-500 hover:border-teal-300'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? 'Adding…' : 'Add expense'}
        </Button>
      </div>
    </form>
  )
}
