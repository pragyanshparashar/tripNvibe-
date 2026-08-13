import { useEffect, useState } from 'react'

export default function LoadingScreen({ messages, title = 'Just a moment' }) {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!messages || messages.length < 2) return
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [messages])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      <div className="relative mb-8 h-20 w-20">
        <div className="absolute inset-0 animate-ping rounded-full bg-teal-400/40" />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-brand text-3xl shadow-lift animate-floatSlow">
          ✈️
        </div>
      </div>
      <h2 className="font-display text-2xl font-semibold text-navy-900">{title}</h2>
      {messages && (
        <p className="mt-3 min-h-[1.5rem] font-body text-navy-500 transition-opacity duration-300">
          {messages[messageIndex]}
        </p>
      )}
    </div>
  )
}
