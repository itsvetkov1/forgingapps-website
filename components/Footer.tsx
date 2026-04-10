'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useTranslation('common.footer')
  const { localePath } = useLanguage()

  return (
    <footer className="bg-forge-stone border-t border-forge-ember/30">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-cinzel text-lg font-bold text-forge-gold mb-2">
              <img src="/logo.svg" alt="ForgingApps" width={28} height={28} className="inline-block" />
              <span>ForgingApps</span>
            </div>
            <p className="text-gray-400 text-sm">{t('tagline')}</p>
          </div>

          <div>
            <h3 className="font-cinzel text-forge-gold mb-4">{t('services')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={localePath('/services')} className="text-gray-400 hover:text-forge-gold transition">{t('allPackages')}</Link></li>
              <li><Link href={localePath('/ai-consulting')} className="text-gray-400 hover:text-forge-gold transition">{t('aiConsulting')}</Link></li>
              <li><Link href={localePath('/contact')} className="text-gray-400 hover:text-forge-gold transition">{t('getAQuote')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-cinzel text-forge-gold mb-4">{t('company')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href={localePath('/demo')} className="text-gray-400 hover:text-forge-gold transition">{t('demo')}</Link></li>
              <li><Link href={localePath('/about')} className="text-gray-400 hover:text-forge-gold transition">{t('aboutUs')}</Link></li>
              <li><Link href={localePath('/blog')} className="text-gray-400 hover:text-forge-gold transition">{t('blog')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-cinzel text-forge-gold mb-4">{t('contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@forgingapps.com" className="text-gray-400 hover:text-forge-gold transition">hello@forgingapps.com</a></li>
              <li className="text-gray-400">{t('location')}</li>
              <li><Link href={localePath('/contact')} className="text-forge-gold hover:text-forge-ember transition font-semibold">{t('freeConsultation')}</Link></li>
              <li><a href={t('linkedInUrl')} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-forge-gold transition flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>{t('linkedIn')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-forge-ember/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>{t('copyright')}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href={localePath('/privacy')} className="hover:text-forge-gold transition">{t('privacyPolicy')}</Link>
            <Link href={localePath('/terms')} className="hover:text-forge-gold transition">{t('termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
