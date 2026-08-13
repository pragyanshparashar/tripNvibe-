const avatarColors = [
  'bg-teal-500', 'bg-navy-600', 'bg-amber-500', 'bg-navy-400', 'bg-teal-600',
]

function initials(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || '?'
}

export default function ParticipantList({ participants, organizerName }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {participants.map((participant, index) => (
        <li
          key={`${participant.name}-${index}`}
          className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft"
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold text-white ${avatarColors[index % avatarColors.length]}`}
          >
            {initials(participant.name)}
          </span>
          <div>
            <p className="font-body text-sm font-semibold text-navy-900">{participant.name}</p>
            {participant.name === organizerName && (
              <p className="font-body text-xs text-teal-500">Organizer</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
