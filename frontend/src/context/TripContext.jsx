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
  const [selectedIndices, setSelectedIndicesState] = useState(saved?.selectedIndices || [])
  const [room, setRoomState] = useState(saved?.room || null)
  const [myName, setMyNameState] = useState(saved?.myName || '')

  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ preferences, itineraryOptions, selectedIndices, room, myName })
    )
  }, [preferences, itineraryOptions, selectedIndices, room, myName])

  function updatePreferences(partial) {
    setPreferencesState((current) => ({ ...current, ...partial }))
  }

  function setItineraryOptions(options) {
    setItineraryOptionsState(options)
    setSelectedIndicesState([])
  }

  function toggleItinerarySelection(index) {
    setSelectedIndicesState((current) =>
      current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index]
    )
  }

  function setRoom(roomDoc) {
    setRoomState(roomDoc)
  }

  function setMyName(name) {
    setMyNameState(name)
  }

  function resetTrip() {
    setPreferencesState(emptyPreferences)
    setItineraryOptionsState([])
    setSelectedIndicesState([])
    setRoomState(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  const sortedSelectedIndices = [...selectedIndices].sort((a, b) => a - b)

  const value = {
    preferences,
    updatePreferences,
    itineraryOptions,
    setItineraryOptions,
    selectedIndices,
    toggleItinerarySelection,
    selectedItineraries: sortedSelectedIndices.map((index) => itineraryOptions[index]),
    room,
    setRoom,
    myName,
    setMyName,
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
