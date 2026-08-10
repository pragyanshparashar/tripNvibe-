import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import { generateTrip } from '../services/vibeService'
import LoadingScreen from '../components/common/LoadingScreen'
import ErrorState from '../components/common/ErrorState'

const loadingMessages = [
  'Mixing your vibe with the map…',
  'Consulting the travel gods…',
  'Scouting hotels that fit your budget…',
  'Packing day-by-day plans…',
  'Adding a dash of adventure…',
  'Almost there — plating up your options…',
]

export default function GeneratingPage() {
  const navigate = useNavigate()
  const { preferences, setItineraryOptions } = useTrip()
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const hasRequiredFields = Boolean(
    preferences.destination &&
      preferences.tripDates?.startDate &&
      preferences.tripDates?.endDate &&
      preferences.budget &&
      preferences.groupSize &&
      preferences.vibeType
  )
  const requestInFlight = useRef(false)

  useEffect(() => {
    if (!hasRequiredFields) return
    if (requestInFlight.current) return

    requestInFlight.current = true
    setError(null)

    generateTrip(preferences)
      .then((tripOptions) => {
        setItineraryOptions(tripOptions)
        navigate('/itineraries')
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        requestInFlight.current = false
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, hasRequiredFields])

  if (!hasRequiredFields) {
    return (
      <ErrorState
        title="Let's start with your vibe"
        message="We don't have your trip details yet."
        onRetry={() => navigate('/vibe-check')}
        retryLabel="Go to Vibe Check"
      />
    )
  }

  if (error) {
    return (
      <ErrorState
        title="Couldn't generate your trip"
        message={error}
        onRetry={() => setAttempt((count) => count + 1)}
      />
    )
  }

  return <LoadingScreen title="Building your trip" messages={loadingMessages} />
}
