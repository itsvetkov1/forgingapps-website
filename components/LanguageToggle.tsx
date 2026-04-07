'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { swapLocaleInPath } from '@/lib/i18n/routing'

function EnFlag({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className="rounded-full">
      <defs><clipPath id="enCircle"><circle cx="30" cy="30" r="30" /></clipPath></defs>
      <g clipPath="url(#enCircle)">
        <rect width="60" height="60" fill="#012169" />
        <path d="M0,0 L60,60 M60,0 L0,60" stroke="#fff" strokeWidth="9" />
        <path d="M0,0 L60,60 M60,0 L0,60" stroke="#C8102E" strokeWidth="5" />
        <path d="M30,0 V60 M0,30 H60" stroke="#fff" strokeWidth="15" />
        <path d="M30,0 V60 M0,30 H60" stroke="#C8102E" strokeWidth="9" />
      </g>
    </svg>
  )
}

function BgFlag({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className="rounded-full">
      <defs><clipPath id="bgCircle"><circle cx="30" cy="30" r="30" /></clipPath></defs>
      <g clipPath="url(#bgCircle)">
        <rect y="0" width="60" height="20" fill="#fff" />
        <rect y="20" width="60" height="20" fill="#00966E" />
        <rect y="40" width="60" height="20" fill="#D62612" />
      </g>
    </svg>
  )
}

export default function LanguageToggle() {
  const pathname = usePathname()
  const { language } = useLanguage()

  if (!pathname || (!pathname.startsWith('/en') && !pathname.startsWith('/bg'))) {
    return null
  }

  const enHref = swapLocaleInPath(pathname, 'en')
  const bgHref = swapLocaleInPath(pathname, 'bg')

  return (
    <div className="flex items-center gap-1.5">
      <Link href={enHref} className={`rounded-full transition-all duration-200 ${language === 'en' ? 'ring-2 ring-forge-gold scale-110' : 'opacity-50 hover:opacity-80'}`} aria-label="Switch to English" title="English">
        <EnFlag size={22} />
      </Link>
      <Link href={bgHref} className={`rounded-full transition-all duration-200 ${language === 'bg' ? 'ring-2 ring-forge-gold scale-110' : 'opacity-50 hover:opacity-80'}`} aria-label="Switch to Bulgarian" title="Bulgarian">
        <BgFlag size={22} />
      </Link>
    </div>
  )
}
