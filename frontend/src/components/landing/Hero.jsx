import { Link } from 'react-router-dom'
import Button from '../common/Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-coral-200/50 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 h-72 w-72 rounded-full bg-deep-200/50 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center animate-fadeUp">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-deep-700 shadow-soft">
          ✨ AI-powered group trip planning
        </span>

        <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-deep-900 sm:text-6xl">
          Plan the trip.
          <br />
          <span className="bg-sunset bg-clip-text text-transparent">Find the vibe.</span>
          <br />
          Let everyone decide.
        </h1>

        <p className="mx-auto mt-6 max-w-xl font-body text-lg text-deep-600">
          Tell us your vibe, and TripnVibe&rsquo;s AI builds real trip options for your group —
          then your friends vote and decide together. No more 40-message group chats.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button as={Link} to="/vibe-check" variant="primary" size="lg">
            Start Vibe Check →
          </Button>
          <Button as={Link} to="/room/join" variant="outline" size="lg">
            I have a room code
          </Button>
        </div>
      </div>
    </section>
  )
}
