import Button from '../common/Button'
import ProgressBar from './ProgressBar'

export default function StepShell({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel = 'Continue',
  nextDisabled = false,
  isSubmitting = false,
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-6 py-16">
      <ProgressBar step={step} totalSteps={totalSteps} />

      <div className="animate-fadeUp text-center">
        <h1 className="font-display text-3xl font-bold text-deep-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 font-body text-deep-500">{subtitle}</p>}

        <div className="mt-10">{children}</div>

        <div className="mt-10 flex items-center justify-center gap-3">
          {step > 0 && (
            <Button variant="ghost" onClick={onBack} type="button">
              ← Back
            </Button>
          )}
          <Button
            variant="primary"
            size="lg"
            onClick={onNext}
            disabled={nextDisabled || isSubmitting}
            type="button"
          >
            {isSubmitting ? 'Generating…' : nextLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
