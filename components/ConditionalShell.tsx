'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VelouraDemoBanner from '@/components/VelouraDemoBanner'
import { shouldHideSiteChrome } from '@/lib/brief-received-routing.mjs'

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isVelouraShop = pathname?.startsWith('/demo/veloura-shop') || pathname?.startsWith('/en/demo/veloura-shop') || pathname?.startsWith('/bg/demo/veloura-shop')
  const isVelouraSupport = pathname?.includes('/demo/veloura-support')
  const isVelouraDemo = Boolean(isVelouraShop || isVelouraSupport)
  const hideSiteChrome = shouldHideSiteChrome(pathname ?? '')

  useEffect(() => {
    if (isVelouraShop) {
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
  }, [isVelouraShop])

  // Scroll to anchor after client-rendered content has mounted.
  // Client components populate the DOM after initial HTML, and late-loading
  // content (images, below-the-fold sections) causes layout shifts that
  // invalidate a single scroll attempt. Multiple staggered attempts converge
  // on the final offset even through shifts.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash) return
    const id = window.location.hash.slice(1)
    if (!id) return
    const doScroll = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
    const timeouts = [50, 200, 500, 900, 1400, 2000].map((d) => window.setTimeout(doScroll, d))
    return () => timeouts.forEach((t) => window.clearTimeout(t))
  }, [pathname])

  return (
    <>
      {isVelouraDemo && <VelouraDemoBanner />}
      {!isVelouraShop && !hideSiteChrome && <Navbar />}
      <main>{children}</main>
      {!isVelouraShop && !hideSiteChrome && <Footer />}
    </>
  )
}
