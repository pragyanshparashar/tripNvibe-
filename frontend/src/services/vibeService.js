import api from './api'

const FALLBACK_ERROR = 'Something went wrong while generating your trip. Please try again.'

export async function generateTrip(preferences) {
  try {
    const { destination, tripDates, budget, groupSize, vibeType } = preferences
    const response = await api.post('/vibe/generate', {
      destination,
      tripDates,
      budget,
      groupSize,
      vibeType,
    })
    return response.data.data.tripOptions
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      throw new Error('This is taking longer than expected. Please try again.')
    }
    const message = error.response?.data?.message || FALLBACK_ERROR
    throw new Error(message)
  }
}
