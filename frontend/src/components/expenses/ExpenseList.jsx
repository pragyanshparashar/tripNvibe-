import { formatCurrency } from '../../utils/format'

const categoryEmoji = {
  Flights: '✈️',
  Hotel: '🏨',
  Food: '🍽️',
  Activities: '🎟️',
  Transport: '🚗',
  Other: '💸',
}

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) return null

  return (
    <ul className="space-y-2">
      {expenses.map((expense) => (
        <li
          key={expense._id}
          className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{categoryEmoji[expense.category] || '💸'}</span>
            <div>
              <p className="font-body text-sm font-semibold text-navy-900">{expense.description}</p>
              <p className="font-body text-xs text-navy-400">
                Paid by {expense.paidBy} &middot; split {expense.splitAmong?.length || 0} ways
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-bold text-navy-900">
              {formatCurrency(expense.amount)}
            </span>
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(expense._id)}
                aria-label="Delete expense"
                className="text-navy-300 hover:text-teal-600"
              >
                ✕
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
