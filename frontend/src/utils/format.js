export function formatCurrency(amount) {
  if (typeof amount !== 'number') return amount
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateRange(startDate, endDate) {
  if (!startDate || !endDate) return ''
  return `${formatDate(startDate)} – ${formatDate(endDate)}`
}

export function tripDurationInDays(startDate, endDate) {
  if (!startDate || !endDate) return null
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24))
  return diff >= 0 ? diff + 1 : null
}
