'use client'

import ContactForm from '@/components/ContactForm'
import CopyEmailButton from '@/components/CopyEmailButton'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

// TODO: Replace with the real Google Calendar appointment schedule URL once it is created.
const GOOGLE_CALENDAR_BOOKING_URL = '' // TODO: Add real Google Calendar appointment URL

export default function ContactContent() {
  const { language } = useLanguage()
  const data = translations[language].contact

  const quickFaqs = [data.quickFaq.q1, data.quickFaq.q2, data.quickFaq.q3, data.quickFaq.q4, data.quickFaq.q5]
  const faqs = [data.faq1, data.faq2, data.faq3]
  const bookingCopy = language === 'bg'
    ? {
        eyebrow: 'Резервирайте разговор',
        heading: 'Запазете безплатен 30-минутен разговор',
        description: 'Ако предпочитате директно да намерим удобен час, резервирайте разговор преди да попълните формата. Ако линкът още не е активен, използвайте формата по-долу.',
        cta: 'Отворете календара',
      }
    : {
        eyebrow: 'Book a call',
        heading: 'Book a Free 30-Minute Call',
        description: 'Pick a time that works. No prep needed.',
        cta: 'Open calendar booking',
      }

  return (
    <div className="bg-forge-dark min-h-screen">
      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-4xl text-center">
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">{data.heading}</h1>
          <p className="text-xl text-gray-300 mb-4">{data.subheading}</p>
          <p className="text-sm text-forge-gold">{data.accepting}</p>
        </div>
      </section>

      {GOOGLE_CALENDAR_BOOKING_URL && (
      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-5xl mb-10">
          <div className="rounded-2xl border border-forge-ember/30 bg-forge-stone p-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-forge-gold/70">{bookingCopy.eyebrow}</p>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-3">{bookingCopy.heading}</h2>
                <p className="max-w-2xl text-gray-300">{bookingCopy.description}</p>
              </div>
              <a
                href={GOOGLE_CALENDAR_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary whitespace-nowrap"
              >
                {bookingCopy.cta}
              </a>
            </div>
          </div>
        </div>

      </section>
      )}

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-6">{data.formHeading}</h2>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-6">{data.directContact.heading}</h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <a href="mailto:hello@forgingapps.com" className="text-forge-gold hover:text-forge-ember transition">{data.directContact.email}</a>
                  <CopyEmailButton />
                </div>
                <p>{data.directContact.location}</p>
                <p>{data.directContact.responseTime}</p>
              </div>
            </div>

            <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-6">{data.faqHeading}</h2>
              <div className="space-y-5">{faqs.map((faq: any) => <div key={faq.q}><h3 className="font-semibold text-white mb-2">{faq.q}</h3><p className="text-gray-400">{faq.a}</p></div>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-4xl">
          <h2 className="font-cinzel text-4xl font-bold text-center text-forge-gold mb-10">{data.quickFaq.heading}</h2>
          <div className="space-y-6">{quickFaqs.map((faq: any) => <div key={faq.q} className="bg-forge-stone border border-forge-ember/20 rounded-lg p-6"><h3 className="font-semibold text-white mb-2">{faq.q}</h3><p className="text-gray-400">{faq.a}</p></div>)}</div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-4">{data.bottomCta.heading}</h2>
          <p className="text-gray-300 text-lg">{data.bottomCta.description}</p>
        </div>
      </section>
    </div>
  )
}
