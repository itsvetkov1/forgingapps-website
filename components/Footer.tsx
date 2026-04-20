'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useTranslation('common.footer')
  const { language, localePath } = useLanguage()

  return (
    <footer className="bg-forge-stone border-t border-forge-ember/30">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-cinzel text-lg font-bold text-forge-gold mb-2">
              <img src="/logo.svg" alt="ForgingApps logo" width={28} height={28} className="inline-block" />
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
              <li><a href="mailto:hello@forgingapps.com" className="text-gray-400 hover:text-forge-gold transition">{t('email')}</a></li>
              <li className="text-gray-400">{t('location')}</li>
              <li><Link href={localePath('/contact')} className="text-forge-gold hover:text-forge-ember transition font-semibold">{t('freeConsultation')}</Link></li>
            </ul>
          </div>

          {/* Legal entity section hidden until real EIK/BULSTAT and VAT data is available
          <div>
            <h3 className="font-cinzel text-forge-gold mb-4">{t('legalHeading')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>{t('location')}</li>
              <li>{t('registrationLabel')}: {t('registrationValue')}</li>
              <li>{t('vatLabel')}: {t('vatValue')}</li>
              {language === 'bg' ? <li>Дружеството е регистрирано в България.</li> : <li>Company registered in Bulgaria.</li>}
            </ul>
          </div>
          */}
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
