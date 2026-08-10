export default function EmptyState({ icon = '🧭', title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-deep-900/15 bg-white/60 px-6 py-14 text-center">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-deep-900">{title}</h3>
      {message && <p className="mt-2 max-w-sm font-body text-sm text-deep-500">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
