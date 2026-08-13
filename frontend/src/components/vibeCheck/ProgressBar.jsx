export default function ProgressBar({ step, totalSteps }) {
  return (
    <div className="mx-auto mb-10 flex max-w-md items-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            index <= step ? 'bg-brand' : 'bg-navy-900/10'
          }`}
        />
      ))}
    </div>
  )
}
