import { useState } from 'react'
import Button from './Button'

export default function CopyButton({ value, label = 'Copy', copiedLabel = 'Copied!', ...props }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard API unavailable — silently ignore, button just won't confirm
    }
  }

  return (
    <Button variant="outline" size="md" onClick={handleCopy} {...props}>
      {copied ? `✓ ${copiedLabel}` : label}
    </Button>
  )
}
