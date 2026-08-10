import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import StepShell from '../components/vibeCheck/StepShell'
import NameStep from '../components/vibeCheck/NameStep'
import DestinationStep from '../components/vibeCheck/DestinationStep'
import DatesStep from '../components/vibeCheck/DatesStep'
import BudgetStep from '../components/vibeCheck/BudgetStep'
import GroupSizeStep from '../components/vibeCheck/GroupSizeStep'
import VibeTypeStep from '../components/vibeCheck/VibeTypeStep'

const steps = [
  {
    key: 'organizerName',
    title: "What's your name?",
    subtitle: "You'll be the organizer for this trip.",
    Component: NameStep,
    isValid: (v) => v.trim().length > 0,
  },
  {
    key: 'destination',
    title: 'Where are you going?',
    subtitle: 'Pick a city, region, or country.',
    Component: DestinationStep,
    isValid: (v) => v.trim().length > 0,
  },
  {
    key: 'tripDates',
    title: 'When are you going?',
    subtitle: 'Choose your travel window.',
    Component: DatesStep,
    isValid: (v) => Boolean(v.startDate && v.endDate && v.endDate >= v.startDate),
  },
  {
    key: 'budget',
    title: "What's your budget?",
    subtitle: 'Total budget per person, in ₹.',
    Component: BudgetStep,
    isValid: (v) => Number(v) > 0,
  },
  {
    key: 'groupSize',
    title: 'How many people?',
    subtitle: 'Including you.',
    Component: GroupSizeStep,
    isValid: (v) => Number(v) >= 1,
  },
  {
    key: 'vibeType',
    title: "What's your vibe?",
    subtitle: 'Pick the one that fits best.',
    Component: VibeTypeStep,
    isValid: (v) => Boolean(v),
  },
]

export default function VibeCheckPage() {
  const navigate = useNavigate()
  const { preferences, updatePreferences } = useTrip()
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState(preferences)

  const currentStep = steps[stepIndex]
  const currentValue = form[currentStep.key]
  const isLastStep = stepIndex === steps.length - 1
  const canContinue = currentStep.isValid(currentValue)

  function handleChange(newValue) {
    setForm((current) => ({ ...current, [currentStep.key]: newValue }))
  }

  function handleNext() {
    if (!canContinue) return

    if (isLastStep) {
      updatePreferences(form)
      navigate('/generating')
      return
    }

    setStepIndex((index) => index + 1)
  }

  function handleBack() {
    setStepIndex((index) => Math.max(0, index - 1))
  }

  const { Component } = currentStep

  return (
    <StepShell
      step={stepIndex}
      totalSteps={steps.length}
      title={currentStep.title}
      subtitle={currentStep.subtitle}
      onNext={handleNext}
      onBack={handleBack}
      nextLabel={isLastStep ? 'Generate My Trip →' : 'Continue'}
      nextDisabled={!canContinue}
    >
      <Component value={currentValue} onChange={handleChange} />
    </StepShell>
  )
}
