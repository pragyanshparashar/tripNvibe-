import Button from './Button'

export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-coral-100 text-3xl">
        ⚠️
      </div>
      <h2 className="font-display text-xl font-semibold text-deep-900">{title}</h2>
      {message && <p className="mt-2 max-w-md font-body text-deep-500">{message}</p>}
      {onRetry && (
        <Button variant="primary" className="mt-6" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  )
}
