'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { shouldHideSiteChrome } from '@/lib/brief-received-routing.mjs'

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isVeloura = pathname?.startsWith('/demo/veloura-shop') || pathname?.startsWith('/en/demo/veloura-shop') || pathname?.startsWith('/bg/demo/veloura-shop')
  const hideSiteChrome = shouldHideSiteChrome(pathname ?? '')

  useEffect(() => {
    if (isVeloura) {
      document.body.classList.remove('bg-forge-dark', 'text-white')
      document.body.classList.add('bg-white', 'text-gray-900')
      return () => {
        document.body.classList.remove('bg-white', 'text-gray-900')
        document.body.classList.add('bg-forge-dark', 'text-white')
      }
    }

    document.body.classList.remove('bg-white', 'text-gray-900')
    document.body.classList.add('bg-forge-dark', 'text-white')

    return () => {
      document.body.classList.remove('bg-white', 'text-gray-900')
      document.body.classList.add('bg-forge-dark', 'text-white')
    }
  }, [isVeloura])

  return (
    <>
      {!isVeloura && !hideSiteChrome && <Navbar />}
      <main>{children}</main>
      {!isVeloura && !hideSiteChrome && <Footer />}
    </>
  )
}
