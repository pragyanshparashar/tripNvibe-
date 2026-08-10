import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import FeatureGrid from '../components/landing/FeatureGrid'
import CtaSection from '../components/landing/CtaSection'

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <FeatureGrid />
      <CtaSection />
    </div>
  )
}
