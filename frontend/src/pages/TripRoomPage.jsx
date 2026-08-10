import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTrip } from '../context/TripContext'
import { getRoom, castVote, finalizeVoting, addExpense, deleteExpense } from '../services/roomService'
import { joinRoomChannel, subscribeToRoomUpdates } from '../services/socket'
import { formatCurrency } from '../utils/format'
import LoadingScreen from '../components/common/LoadingScreen'
import ErrorState from '../components/common/ErrorState'
import EmptyState from '../components/common/EmptyState'
import Button from '../components/common/Button'
import RoomHeader from '../components/room/RoomHeader'
import ParticipantList from '../components/room/ParticipantList'
import ShareRoomPanel from '../components/room/ShareRoomPanel'
import VotingPanel from '../components/voting/VotingPanel'
import AddExpenseForm from '../components/expenses/AddExpenseForm'
import ExpenseList from '../components/expenses/ExpenseList'
import BalancesSummary from '../components/expenses/BalancesSummary'

const POLL_FALLBACK_MS = 20000

export default function TripRoomPage() {
  const { roomCode } = useParams()
  const { myName } = useTrip()
  const [room, setRoom] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  useEffect(() => {
    let isMounted = true

    function fetchRoom() {
      getRoom(roomCode)
        .then((data) => {
          if (!isMounted) return
          setRoom(data)
          setError(null)
        })
        .catch((err) => {
          if (!isMounted) return
          setError(err.message)
        })
        .finally(() => {
          if (!isMounted) return
          setIsLoading(false)
        })
    }

    fetchRoom()
    joinRoomChannel(roomCode)
    const unsubscribe = subscribeToRoomUpdates((updatedRoom) => {
      if (updatedRoom.roomCode === roomCode) {
        setRoom(updatedRoom)
      }
    })
    const interval = setInterval(fetchRoom, POLL_FALLBACK_MS)

    return () => {
      isMounted = false
      unsubscribe()
      clearInterval(interval)
    }
  }, [roomCode])

  if (isLoading) {
    return <LoadingScreen title="Loading your room" messages={['Fetching the latest trip details…']} />
  }

  if (error || !room) {
    return <ErrorState title="Room not found" message={error || 'This room code doesn\'t exist.'} />
  }

  async function handleVote(choiceIndex) {
    await castVote(roomCode, myName, choiceIndex)
  }

  async function handleFinalize(choiceIndex) {
    await finalizeVoting(roomCode, choiceIndex)
  }

  async function handleAddExpense(expenseData) {
    await addExpense(roomCode, expenseData)
  }

  async function handleDeleteExpense(expenseId) {
    await deleteExpense(roomCode, expenseId)
  }

  const selectedTrip = room.selectedTrip
  const expenses = room.expenses || []
  const isVoting = room.roomStatus === 'voting'

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <RoomHeader room={room} />

      {isVoting && (
        <div className="mt-8">
          <VotingPanel room={room} myName={myName} onVote={handleVote} onFinalize={handleFinalize} />
        </div>
      )}

      {selectedTrip && !isVoting && (
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-soft">
          <p className="font-body text-xs font-semibold uppercase tracking-wide text-deep-400">
            {room.roomStatus === 'finalized' ? 'Winning itinerary' : 'Selected itinerary'}
          </p>
          <h2 className="mt-1 font-display text-xl font-bold text-deep-900">{selectedTrip.title}</h2>
          {selectedTrip.summary && (
            <p className="mt-2 font-body text-sm text-deep-600">{selectedTrip.summary}</p>
          )}
          {typeof selectedTrip.estimatedCost === 'number' && (
            <p className="mt-3 font-display text-lg font-bold text-coral-600">
              {formatCurrency(selectedTrip.estimatedCost)}
            </p>
          )}
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-4 font-display text-xl font-bold text-deep-900">
          Participants ({room.participants?.length || 0})
        </h2>
        {room.participants?.length > 0 ? (
          <ParticipantList participants={room.participants} organizerName={room.organizerName} />
        ) : (
          <EmptyState icon="👋" title="Waiting for friends to join" />
        )}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-deep-900">Trip Expenses</h2>
          {!showExpenseForm && (
            <Button variant="outline" onClick={() => setShowExpenseForm(true)}>
              + Add expense
            </Button>
          )}
        </div>

        {showExpenseForm && (
          <div className="mb-4">
            <AddExpenseForm
              participants={room.participants || []}
              onAdd={handleAddExpense}
              onClose={() => setShowExpenseForm(false)}
            />
          </div>
        )}

        {expenses.length > 0 ? (
          <div className="space-y-4">
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
            <BalancesSummary expenses={expenses} participants={room.participants || []} />
          </div>
        ) : (
          !showExpenseForm && <EmptyState icon="🧾" title="No expenses yet" message="Add one to start splitting costs." />
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl bg-dusk p-8 text-center text-cream-50 shadow-soft sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h3 className="font-display text-lg font-semibold">Pay your share</h3>
          <p className="font-body text-sm text-deep-100">Settle your contribution for this trip.</p>
        </div>
        <Button as={Link} to={`/room/${roomCode}/payment`} variant="primary">
          Pay your share →
        </Button>
      </div>

      <div className="mt-8">
        <ShareRoomPanel roomCode={room.roomCode} />
      </div>
    </div>
  )
}
