'use client'

import { useState } from 'react'
import { Copy, CheckCheck } from 'lucide-react'

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('hello@forgingapps.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback silently
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-forge-gold hover:text-forge-ember transition p-1"
      aria-label="Copy email address"
      title={copied ? 'Copied' : 'Copy email address'}
    >
      {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
    </button>
  )
}
