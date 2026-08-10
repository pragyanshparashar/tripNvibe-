import { Link } from 'react-router-dom'
import Button from '../common/Button'

export default function CtaSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl bg-dusk px-8 py-16 text-center shadow-lift">
        <h2 className="font-display text-3xl font-bold text-cream-50 sm:text-4xl">
          Ready to find your group&rsquo;s vibe?
        </h2>
        <p className="mx-auto mt-4 max-w-md font-body text-deep-100">
          Start your Vibe Check and have AI-built trip options in minutes.
        </p>
        <Button as={Link} to="/vibe-check" variant="primary" size="lg" className="mt-8">
          Start Vibe Check →
        </Button>
      </div>
    </section>
  )
}
