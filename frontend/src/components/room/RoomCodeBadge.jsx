export default function RoomCodeBadge({ code, size = 'md' }) {
  const sizeClasses = size === 'lg' ? 'text-4xl tracking-[0.3em] px-8 py-5' : 'text-xl tracking-[0.2em] px-5 py-2.5'

  return (
    <div className={`inline-flex items-center justify-center rounded-2xl bg-night font-display font-bold text-cream-50 shadow-soft ${sizeClasses}`}>
      {code}
    </div>
  )
}
