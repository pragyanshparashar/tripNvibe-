import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <div className="text-5xl">🧭</div>
      <h1 className="mt-4 font-display text-3xl font-bold text-navy-900">Lost the trail</h1>
      <p className="mt-2 font-body text-navy-500">This page doesn&rsquo;t exist. Let&rsquo;s get you back on track.</p>
      <Button as={Link} to="/" variant="primary" className="mt-6">
        Back to home
      </Button>
    </div>
  )
}
