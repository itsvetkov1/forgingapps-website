'use client'

import Link from 'next/link'
import { Shield, Users, Coins, Linkedin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

const teamPhotos: Record<string, string> = {
  'Ivaylo Tsvetkov': '/team/ivaylo-tsvetkov.jpg',
  'Radoslav Lambrev': '/team/radoslav-lambrev.jpg',
  'Ивайло Цветков': '/team/ivaylo-tsvetkov.jpg',
  'Радослав Ламбрев': '/team/radoslav-lambrev.jpg',
}

export default function AboutContent() {
  const { language, localePath } = useLanguage()
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
          <p className="mt-6 text-sm leading-7 text-gray-400">
            Want to see what we actually build?{' '}
            <Link href={localePath('/demo')} className="text-forge-gold hover:text-forge-ember transition-colors underline underline-offset-4">
              See the demos
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-12">{data.teamHeading}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[data.ivaylo, data.radoslav].map((person: any) => (
              <div key={person.name} className="bg-forge-stone border border-forge-ember/30 rounded-xl overflow-hidden">
                <div className="bg-gradient-to-b from-forge-ember/30 to-transparent h-56 flex items-center justify-center py-6">
                  <div className="relative">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-forge-ember/40">
                      <img
                        src={teamPhotos[person.name] || '/team/placeholder.jpg'}
                        alt={person.name}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-cinzel text-3xl font-bold text-forge-gold mb-2">{person.name}</h3>
                  <p className="text-forge-ember font-semibold mb-4">{person.role}</p>
                  <p className="text-gray-300 mb-4">{person.bio}</p>
                  <p className="text-gray-400 mb-6">{person.background}</p>
                  <h4 className="font-cinzel text-xl font-bold text-forge-gold mb-3">{person.credentialsTitle}</h4>
                  <ul className="space-y-2 text-gray-400">
                    {Object.keys(person).filter((key) => key !== 'credentialsTitle' && key.startsWith('cred')).map((key) => (
                      <li key={key} className="flex items-start gap-3"><span className="text-forge-gold mt-1">✓</span><span>{person[key]}</span></li>
                    ))}
                  </ul>
                  {person.linkedInUrl && (
                    <div className="mt-6 pt-5 border-t border-forge-ember/20">
                      <a
                        href={person.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-forge-ember hover:text-forge-gold transition-colors text-sm font-medium"
                      >
                        <Linkedin size={16} />
                        <span>{person.linkedin}</span>
                      </a>
                    </div>
                  )}
                </div>
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
          <Link href={localePath('/contact')} className="btn-primary">{data.cta.button}</Link>
        </div>
      </section>
    </div>
  )
}
