import { formatCurrency } from '../../utils/format'
import { computeNetBalances, simplifyDebts } from '../../utils/balances'

export default function BalancesSummary({ expenses, participants }) {
  const participantNames = participants.map((p) => p.name)
  const netBalances = computeNetBalances(expenses, participantNames)
  const transfers = simplifyDebts(netBalances)

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-navy-900">Balances</h3>
        <span className="font-body text-sm text-navy-500">Total spent: {formatCurrency(totalSpent)}</span>
      </div>

      {transfers.length === 0 ? (
        <p className="mt-3 font-body text-sm text-navy-400">Everyone&rsquo;s settled up. 🎉</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {transfers.map((transfer, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-xl bg-cream-100 px-4 py-2.5 font-body text-sm"
            >
              <span className="text-navy-700">
                <strong className="text-navy-900">{transfer.from}</strong> owes{' '}
                <strong className="text-navy-900">{transfer.to}</strong>
              </span>
              <span className="font-display font-bold text-teal-600">{formatCurrency(transfer.amount)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
