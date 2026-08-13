import { useState } from 'react'
import VoteOptionCard from './VoteOptionCard'
import FinalizeVotingControl from './FinalizeVotingControl'
import Modal from '../common/Modal'
import ItineraryFullDetail from '../itinerary/ItineraryFullDetail'

export default function VotingPanel({ room, myName, onVote, onFinalize }) {
  const [isVoting, setIsVoting] = useState(false)
  const [isFinalizing, setIsFinalizing] = useState(false)
  const [detailIndex, setDetailIndex] = useState(null)

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
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h2 className="font-display text-lg font-bold text-navy-900 sm:text-xl">🗳️ Vote on the trip</h2>
        <span className="whitespace-nowrap font-body text-sm text-navy-500">
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
            onViewDetail={() => setDetailIndex(index)}
          />
        ))}
      </div>

      {isVoting && <p className="mt-3 text-center font-body text-sm text-navy-400">Casting your vote…</p>}

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

      <Modal isOpen={detailIndex !== null} onClose={() => setDetailIndex(null)}>
        {detailIndex !== null && (
          <div className="p-6 sm:p-8">
            <ItineraryFullDetail itinerary={tripOptions[detailIndex]} tripInfo={room} enablePhotos />
          </div>
        )}
      </Modal>
    </div>
  )
}
