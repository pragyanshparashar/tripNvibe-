export function computeNetBalances(expenses, participantNames) {
  const net = {}
  participantNames.forEach((name) => {
    net[name] = 0
  })

  expenses.forEach((expense) => {
    const splitAmong = expense.splitAmong?.length ? expense.splitAmong : participantNames
    const share = expense.amount / splitAmong.length

    net[expense.paidBy] = (net[expense.paidBy] || 0) + expense.amount

    splitAmong.forEach((name) => {
      net[name] = (net[name] || 0) - share
    })
  })

  return net
}

export function simplifyDebts(netBalances) {
  const creditors = []
  const debtors = []

  Object.entries(netBalances).forEach(([name, balance]) => {
    const rounded = Math.round(balance * 100) / 100
    if (rounded > 0.5) creditors.push({ name, amount: rounded })
    else if (rounded < -0.5) debtors.push({ name, amount: -rounded })
  })

  creditors.sort((a, b) => b.amount - a.amount)
  debtors.sort((a, b) => b.amount - a.amount)

  const transfers = []
  let i = 0
  let j = 0

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i]
    const creditor = creditors[j]
    const amount = Math.min(debtor.amount, creditor.amount)

    if (amount > 0.5) {
      transfers.push({ from: debtor.name, to: creditor.name, amount: Math.round(amount) })
    }

    debtor.amount -= amount
    creditor.amount -= amount

    if (debtor.amount <= 0.5) i += 1
    if (creditor.amount <= 0.5) j += 1
  }

  return transfers
}
