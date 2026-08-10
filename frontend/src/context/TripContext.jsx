import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'tripnvibe.session'

const emptyPreferences = {
  organizerName: '',
  destination: '',
  tripDates: { startDate: '', endDate: '' },
  budget: '',
  groupSize: '',
  vibeType: '',
}

function loadInitialState() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const TripContext = createContext(null)

export function TripProvider({ children }) {
  const saved = loadInitialState()

  const [preferences, setPreferencesState] = useState(saved?.preferences || emptyPreferences)
  const [itineraryOptions, setItineraryOptionsState] = useState(saved?.itineraryOptions || [])
  const [selectedIndex, setSelectedIndexState] = useState(
    saved?.selectedIndex ?? null
  )
  const [room, setRoomState] = useState(saved?.room || null)

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ preferences, itineraryOptions, selectedIndex, room })
    )
  }, [preferences, itineraryOptions, selectedIndex, room])

  function updatePreferences(partial) {
    setPreferencesState((current) => ({ ...current, ...partial }))
  }

  function setItineraryOptions(options) {
    setItineraryOptionsState(options)
    setSelectedIndexState(null)
  }

  function selectItinerary(index) {
    setSelectedIndexState(index)
  }

  function setRoom(roomDoc) {
    setRoomState(roomDoc)
  }

  function resetTrip() {
    setPreferencesState(emptyPreferences)
    setItineraryOptionsState([])
    setSelectedIndexState(null)
    setRoomState(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  const value = {
    preferences,
    updatePreferences,
    itineraryOptions,
    setItineraryOptions,
    selectedIndex,
    selectItinerary,
    selectedItinerary: selectedIndex !== null ? itineraryOptions[selectedIndex] : null,
    room,
    setRoom,
    resetTrip,
  }

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export function useTrip() {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider')
  }
  return context
}
