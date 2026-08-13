import Logo from '../common/Logo'

export default function Footer() {
  return (
    <footer className="glass mt-20 rounded-none border-x-0 border-b-0">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-10 text-center font-body text-sm text-navy-500">
        <Logo size="sm" />
        <p className="mt-2">Plan the trip. Find the vibe. Decide together.</p>
      </div>
    </footer>
  )
}
