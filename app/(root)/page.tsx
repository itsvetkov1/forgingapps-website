'use client'

import { useEffect } from 'react'

export default function RootRedirectPage() {
  useEffect(() => {
    window.location.replace('/en')
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-forge-dark text-white px-6 text-center">
      <div>
        <p className="mb-4">Redirecting to the English site…</p>
        <a href="/en" className="text-forge-gold hover:text-forge-ember transition">Continue to /en</a>
      </div>
    </main>
  )
}
