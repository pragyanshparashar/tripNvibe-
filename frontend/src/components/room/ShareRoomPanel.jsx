import RoomCodeBadge from './RoomCodeBadge'
import CopyButton from '../common/CopyButton'

export default function ShareRoomPanel({ roomCode }) {
  const shareLink = `${window.location.origin}/room/join?code=${roomCode}`

  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-soft">
      <p className="font-body text-sm font-semibold uppercase tracking-wide text-deep-400">
        Room code
      </p>
      <div className="mt-3 flex justify-center">
        <RoomCodeBadge code={roomCode} size="lg" />
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CopyButton value={roomCode} label="Copy code" />
        <CopyButton value={shareLink} label="Copy invite link" />
      </div>

      <p className="mt-4 break-all font-body text-xs text-deep-400">{shareLink}</p>
    </div>
  )
}
