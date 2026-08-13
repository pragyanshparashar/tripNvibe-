import { Link } from 'react-router-dom'
import Button from '../common/Button'
import Logo from '../common/Logo'

export default function Navbar() {
  return (
    <header className="glass sticky top-0 z-40 rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/" className="shrink-0">
          <Logo size="sm" className="sm:hidden" />
          <Logo className="hidden sm:inline-flex" />
        </Link>

        {/* At 375px the logo plus both full-size buttons need ~430px against
            ~330px of usable width, so the row used to burst its container.
            Below `sm` the secondary action drops to a compact text link. */}
        <nav className="flex shrink-0 items-center gap-1 sm:gap-3">
          <Link
            to="/room/join"
            className="whitespace-nowrap rounded-full px-2.5 py-2 font-display text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-900/5 sm:hidden"
          >
            Join
          </Link>
          <Button as={Link} to="/room/join" variant="ghost" size="md" className="hidden sm:inline-flex">
            Join a room
          </Button>

          <Button
            as={Link}
            to="/vibe-check"
            variant="primary"
            size="md"
            className="whitespace-nowrap px-3.5 py-2 text-sm sm:px-5 sm:py-2.5"
          >
            <span className="sm:hidden">Vibe Check</span>
            <span className="hidden sm:inline">Start Vibe Check</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}
