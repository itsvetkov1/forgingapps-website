'use client'

import Link from 'next/link'
import { useState } from 'react'
import LanguageToggle from '@/components/LanguageToggle'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation('common')
  const { localePath } = useLanguage()

  return (
    <nav className="sticky top-0 z-50 bg-forge-dark/95 backdrop-blur-sm border-b border-forge-stone">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href={localePath('/')} className="flex items-center gap-2 font-cinzel text-xl font-bold text-forge-gold hover:text-forge-ember transition">
            <img src="/logo.svg" alt="ForgingApps" width={32} height={32} className="inline-block" />
            <span>ForgingApps</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href={localePath('/services')} className="hover:text-forge-gold transition">{t('nav.services')}</Link>
            <Link href={localePath('/ai-consulting')} className="hover:text-forge-gold transition">{t('nav.aiConsulting')}</Link>
            <Link href={localePath('/demo')} className="hover:text-forge-gold transition">{t('nav.demo')}</Link>
            <Link href={localePath('/about')} className="hover:text-forge-gold transition">{t('nav.about')}</Link>
            <LanguageToggle />
            <Link href={localePath('/contact')} className="btn-small bg-forge-ember text-white hover:bg-forge-gold hover:text-forge-dark">{t('nav.contact')}</Link>
          </div>

          <button className="md:hidden text-forge-gold hover:text-forge-ember transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-forge-stone">
            <div className="flex flex-col gap-3 pt-3">
              <div className="py-2"><LanguageToggle /></div>
              <Link href={localePath('/services')} className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.services')}</Link>
              <Link href={localePath('/ai-consulting')} className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.aiConsulting')}</Link>
              <Link href={localePath('/demo')} className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.demo')}</Link>
              <Link href={localePath('/about')} className="hover:text-forge-gold transition py-2" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
              <Link href={localePath('/contact')} className="btn-small bg-forge-ember text-white hover:bg-forge-gold hover:text-forge-dark w-full text-center" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
