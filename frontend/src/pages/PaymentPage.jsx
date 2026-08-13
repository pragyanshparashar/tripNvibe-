import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRoom, completePayment } from '../services/roomService'
import { formatCurrency } from '../utils/format'
import LoadingScreen from '../components/common/LoadingScreen'
import ErrorState from '../components/common/ErrorState'
import Button from '../components/common/Button'

export default function PaymentPage() {
  const { roomCode } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle') // idle | processing | success

  useEffect(() => {
    getRoom(roomCode)
      .then(setRoom)
      .catch((err) => setError(err.message))
  }, [roomCode])

  if (error) {
    return <ErrorState title="Room not found" message={error} />
  }

  if (!room) {
    return <LoadingScreen title="Loading" messages={['Fetching trip details…']} />
  }

  const expenses = room.expenses || []
  const participantCount = room.participants?.length || room.groupSize || 1
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const contribution = totalSpent > 0 ? totalSpent / participantCount : room.budget / participantCount

  async function handlePay() {
    setStatus('processing')
    await new Promise((resolve) => setTimeout(resolve, 1600))
    try {
      await completePayment(roomCode)
    } catch {
      // the payment itself is a demo either way — the real part is only
      // the "someone paid" flag, so a failure there shouldn't block the
      // success screen from showing
    }
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center">
        <div className="flex h-24 w-24 animate-fadeUp items-center justify-center rounded-full bg-brand text-5xl text-white shadow-lift">
          ✓
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-navy-900">Payment Successful</h1>
        <p className="mt-2 font-body text-navy-500">
          {formatCurrency(contribution)} paid toward {room.destination}. You&rsquo;re all set.
        </p>
        <Button variant="primary" size="lg" className="mt-8" onClick={() => navigate(`/room/${roomCode}`)}>
          Back to Trip Room →
        </Button>
        <p className="mt-6 font-body text-xs text-navy-300">
          This is a demo payment flow — no money actually moved.
        </p>
      </div>
    )
  }

  if (status === 'processing') {
    return <LoadingScreen title="Processing payment" messages={['Talking to your bank…', 'Almost done…']} />
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <p className="font-body text-sm font-semibold uppercase tracking-wide text-navy-400">
        Your trip contribution
      </p>
      <h1 className="mt-2 font-display text-5xl font-bold text-navy-900">{formatCurrency(contribution)}</h1>
      <p className="mt-3 font-body text-navy-500">
        for {room.destination} &middot; split {participantCount} ways
      </p>

      <div className="glass-strong mt-10 w-full p-6">
        <div className="flex items-center justify-between font-body text-sm text-navy-600">
          <span>Payment method</span>
          <span className="font-semibold text-navy-900">UPI / Card</span>
        </div>
      </div>

      <Button variant="primary" size="lg" className="mt-8 w-full" onClick={handlePay}>
        Pay Now
      </Button>
    </div>
  )
}
