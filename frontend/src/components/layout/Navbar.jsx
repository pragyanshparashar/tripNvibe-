import { Link } from 'react-router-dom'
import Button from '../common/Button'
import Logo from '../common/Logo'

export default function Navbar() {
  return (
    <header className="glass sticky top-0 z-40 rounded-none border-x-0 border-t-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/">
          <Logo />
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
