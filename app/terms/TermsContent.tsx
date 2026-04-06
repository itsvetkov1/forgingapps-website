'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

export default function TermsContent() {
  const { language } = useLanguage()
  const data = translations[language].terms
  const sections = [data.section1, data.section2, data.section3, data.section4, data.section5, data.section6, data.section7, data.section8, data.section9, data.section10]

  return (
    <div className="bg-forge-dark min-h-screen section-py">
      <div className="container-custom max-w-4xl">
        <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">{data.title}</h1>
        <p className="text-gray-400 mb-6">{data.effectiveDate}</p>
        <p className="text-gray-300 text-lg mb-10">{data.intro}</p>
        <div className="space-y-8">
          {sections.map((section: any) => (
            <section key={section.title}>
              <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-3">{section.title}</h2>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
