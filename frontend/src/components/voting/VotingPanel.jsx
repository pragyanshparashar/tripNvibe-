import { useState } from 'react'
import VoteOptionCard from './VoteOptionCard'
import FinalizeVotingControl from './FinalizeVotingControl'

export default function VotingPanel({ room, myName, onVote, onFinalize }) {
  const [isVoting, setIsVoting] = useState(false)
  const [isFinalizing, setIsFinalizing] = useState(false)

  const tripOptions = room.tripOptions || []
  const votes = room.votes || []
  const myVote = votes.find((vote) => vote.participantName === myName)
  const isOrganizer = myName && myName === room.organizerName

  const voteCounts = tripOptions.map((_, index) => votes.filter((vote) => vote.choiceIndex === index).length)
  const totalVotes = votes.length
  const leadingIndex = voteCounts.indexOf(Math.max(...voteCounts))

  async function handleVote(index) {
    setIsVoting(true)
    try {
      await onVote(index)
    } finally {
      setIsVoting(false)
    }
  }

  async function handleFinalize(index) {
    setIsFinalizing(true)
    try {
      await onFinalize(index)
    } finally {
      setIsFinalizing(false)
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-deep-900">🗳️ Vote on the trip</h2>
        <span className="font-body text-sm text-deep-500">
          {totalVotes} vote{totalVotes === 1 ? '' : 's'} so far
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {tripOptions.map((itinerary, index) => (
          <VoteOptionCard
            key={index}
            itinerary={itinerary}
            index={index}
            voteCount={voteCounts[index]}
            totalVotes={totalVotes}
            isMyVote={myVote?.choiceIndex === index}
            onVote={handleVote}
          />
        ))}
      </div>

      {isVoting && <p className="mt-3 text-center font-body text-sm text-deep-400">Casting your vote…</p>}

      {isOrganizer && tripOptions.length > 0 && (
        <div className="mt-6">
          <FinalizeVotingControl
            tripOptions={tripOptions}
            leadingIndex={leadingIndex}
            onFinalize={handleFinalize}
            isSubmitting={isFinalizing}
          />
        </div>
      )}
    </div>
  )
}
