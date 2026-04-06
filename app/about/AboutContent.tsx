'use client'

import Link from 'next/link'
import { Shield, Users, Coins } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

export default function AboutContent() {
  const { language } = useLanguage()
  const data = translations[language].about

  return (
    <div className="bg-forge-dark min-h-screen">
      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-4xl">
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-8">{data.whyHeading}</h1>
          <div className="space-y-5 text-lg text-gray-300 leading-relaxed">
            <p>{data.whyP1}</p>
            <p>{data.whyP2}</p>
            <p>{data.whyP3}</p>
            <p>{data.whyP4}</p>
            <p>{data.whyP5}</p>
            <p>{data.whyP6}</p>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">{data.teamHeading}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[data.ivaylo, data.radoslav].map((person: any) => (
              <div key={person.name} className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
                <h3 className="font-cinzel text-3xl font-bold text-forge-gold mb-2">{person.name}</h3>
                <p className="text-forge-ember font-semibold mb-4">{person.role}</p>
                <p className="text-gray-300 mb-4">{person.bio}</p>
                <p className="text-gray-400 mb-6">{person.background}</p>
                <h4 className="font-cinzel text-xl font-bold text-forge-gold mb-3">{person.credentialsTitle}</h4>
                <ul className="space-y-2 text-gray-400">
                  {Object.keys(person).filter((key) => key.startsWith('cred')).map((key) => (
                    <li key={key} className="flex items-start gap-3"><span className="text-forge-gold mt-1">✓</span><span>{person[key]}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">{data.valuesHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 text-center"><div className="flex justify-center text-forge-gold mb-4"><Shield size={36} /></div><h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">{data.quality.title}</h3><p className="text-gray-400">{data.quality.description}</p></div>
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 text-center"><div className="flex justify-center text-forge-gold mb-4"><Users size={36} /></div><h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">{data.directAccess.title}</h3><p className="text-gray-400">{data.directAccess.description}</p></div>
            <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 text-center"><div className="flex justify-center text-forge-gold mb-4"><Coins size={36} /></div><h3 className="font-cinzel text-xl font-bold text-forge-gold mb-3">{data.noSurprises.title}</h3><p className="text-gray-400">{data.noSurprises.description}</p></div>
          </div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-4">{data.cta.heading}</h2>
          <p className="text-gray-300 text-lg mb-8">{data.cta.subheading}</p>
          <Link href="/contact" className="btn-primary">{data.cta.button}</Link>
        </div>
      </section>
    </div>
  )
}
