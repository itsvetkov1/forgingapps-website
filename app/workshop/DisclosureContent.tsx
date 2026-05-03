'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

export default function DisclosureContent() {
  const { language, localePath } = useLanguage()
  const copy = translations[language].workshop.disclosure
  return (
    <main className="workshop scanlines min-h-screen bg-forge-dark text-[var(--ink-100)]">
      <section className="container-custom py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Link href={localePath('/workshop')} className="kicker">/ workshop · disclosure</Link>
          <h1 className="mt-6 font-cinzel text-4xl text-[var(--forge-gold)] md:text-6xl">{copy.title}</h1>
          <p className="mt-6 rounded-lg border border-[var(--hairline-strong)] bg-[rgba(216,102,11,.08)] p-5 text-lg leading-8 text-[var(--ink-200)]">{copy.intro}</p>
          <div className="mt-10 space-y-6">
            {copy.sections.map((section: any) => (
              <section key={section.title} className="panel p-6">
                <h2 className="font-cinzel text-2xl text-[var(--forge-gold)]">{section.title}</h2>
                <p className="mt-3 leading-7 text-[var(--ink-300)]">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
