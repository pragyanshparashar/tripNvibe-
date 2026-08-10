import { Link } from 'react-router-dom'
import Button from '../common/Button'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-deep-900/5 bg-cream-50/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-deep-900">
          <span className="text-2xl">🌴</span>
          TripnVibe
        </Link>
        <nav className="flex items-center gap-3">
          <Button as={Link} to="/room/join" variant="ghost" size="md">
            Join a room
          </Button>
          <Button as={Link} to="/vibe-check" variant="primary" size="md">
            Start Vibe Check
          </Button>
        </nav>
      </div>
    </header>
  )
}
