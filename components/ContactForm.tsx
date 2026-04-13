'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'

interface ContactFormProps {
  packagePreselect?: string
}

const formCopy = {
  en: {
    submittedTitle: 'We Got Your Message!',
    submittedNext: "Here's what happens next:",
    submittedStep1: 'We read your brief carefully — usually same day.',
    submittedStep2: 'We prepare a quick assessment: fit, approach, ballpark.',
    submittedStep3: 'You hear from us within 24 hours on business days.',
    submittedDemoPrompt: 'Want to see our work first?',
    submittedDemoLink: 'Try the live demo →',
    sendAnother: '← Send another message',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'What would you like to discuss?',
    budgetPlaceholder: 'Select budget...',
    budgetOptions: ['Under €1,000', '€1,000 - €5,000', '€5,000 - €15,000', '€15,000+', 'Not sure yet'],
    sourcePlaceholder: 'Select source...',
    sourceOptions: ['Google Search', 'Social Media', 'Referral', 'Other'],
    error: 'Something went wrong. Please try again or email us directly at',
    sending: 'Sending...',
  },
  bg: {
    submittedTitle: 'Получихме съобщението Ви!',
    submittedNext: 'Какво следва:',
    submittedStep1: 'Преглеждаме запитването внимателно, обикновено в същия ден.',
    submittedStep2: 'Подготвяме кратка оценка: подход, съвместимост и ориентировъчен бюджет.',
    submittedStep3: 'Ще се свържем с Вас до 24 часа в работни дни.',
    submittedDemoPrompt: 'Искате първо да видите наша работа?',
    submittedDemoLink: 'Пробвайте живото демо →',
    sendAnother: '← Изпратете друго съобщение',
    subjectLabel: 'Тема',
    subjectPlaceholder: 'Какво искате да обсъдим?',
    budgetPlaceholder: 'Изберете бюджет...',
    budgetOptions: ['Под €1,000', '€1,000 - €5,000', '€5,000 - €15,000', '€15,000+', 'Още не съм сигурен/сигурна'],
    sourcePlaceholder: 'Изберете източник...',
    sourceOptions: ['Google търсене', 'Социални мрежи', 'Препоръка', 'Друго'],
    error: 'Нещо се обърка. Моля, опитайте отново или ни пишете директно на',
    sending: 'Изпращане...',
  },
}

export default function ContactForm({ packagePreselect }: ContactFormProps) {
  const { t, language } = useTranslation('contact')
  const { localePath } = useLanguage()
  const copy = formCopy[language]
  const defaultPackage = packagePreselect || t('packageOptions.notSure')
  const subjectPresets = {
    en: {
      'ai-readiness': 'AI Readiness Assessment',
      'custom-ai-assistant': 'Build a Custom AI Assistant',
      'oracle-consulting': 'Book an Oracle Consulting Session',
      'discovery-workshop': 'Discovery Workshop',
    },
    bg: {
      'ai-readiness': 'Оценка за AI готовност',
      'custom-ai-assistant': 'Изграждане на персонализиран AI асистент',
      'oracle-consulting': 'Oracle консултантска сесия',
      'discovery-workshop': 'Discovery Workshop',
    },
  } as const
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    packageInterest: defaultPackage,
    message: '',
    budget: '',
    source: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const subjectKey = params.get('subject')
    const defaultSubject = subjectKey ? subjectPresets[language][subjectKey as keyof typeof subjectPresets[typeof language]] ?? subjectKey : ''

    if (!defaultSubject) return

    setFormData((prev) => ({
      ...prev,
      subject: prev.subject || defaultSubject,
    }))
  }, [language])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const response = await fetch('https://formspree.io/f/xlgwoabo', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          packageInterest: defaultPackage,
          message: '',
          budget: '',
          source: '',
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="bg-forge-stone border border-forge-gold rounded-lg p-8 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-2">{copy.submittedTitle}</h3>
        <p className="text-gray-300 mb-6">{copy.submittedNext}</p>
        <div className="text-left space-y-3 mb-6 bg-forge-dark rounded-lg p-4 border border-forge-ember/20">
          <div className="flex items-start gap-3">
            <span className="text-forge-ember font-bold">1.</span>
            <p className="text-gray-300 text-sm">{copy.submittedStep1}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-forge-ember font-bold">2.</span>
            <p className="text-gray-300 text-sm">{copy.submittedStep2}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-forge-ember font-bold">3.</span>
            <p className="text-gray-300 text-sm">{copy.submittedStep3}</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">{copy.submittedDemoPrompt}</p>
        <Link href={localePath('/demo')} className="text-forge-gold text-sm font-semibold hover:text-forge-ember transition">
          {copy.submittedDemoLink}
        </Link>
        <div className="mt-4 pt-4 border-t border-forge-ember/20">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-gray-500 text-xs hover:text-gray-300 transition"
          >
            {copy.sendAnother}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">{t('formName')} *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('formName')} required className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">{t('formEmail')} *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your.name@company.com" required className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">{t('formPhone')}</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+359..." className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">{t('formPackage')}</label>
          <select name="packageInterest" value={formData.packageInterest} onChange={handleChange} className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition">
            <option>{t('packageOptions.notSure')}</option>
            <option>{t('packageOptions.spark')}</option>
            <option>{t('packageOptions.ember')}</option>
            <option>{t('packageOptions.anvil')}</option>
            <option>{t('packageOptions.forge')}</option>
            <option>{t('packageOptions.oracle')}</option>
            <option>{t('packageOptions.hearthstone')}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-forge-gold mb-2">{copy.subjectLabel}</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={copy.subjectPlaceholder} className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-forge-gold mb-2">{t('formProject')} *</label>
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t('formProjectHelper')} required rows={5} className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition"></textarea>
        <p className="text-gray-500 text-xs mt-2">{t('formProjectHelper')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">{t('formBudget')}</label>
          <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition">
            <option value="">{copy.budgetPlaceholder}</option>
            {copy.budgetOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">{t('formSource')}</label>
          <select name="source" value={formData.source} onChange={handleChange} className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition">
            <option value="">{copy.sourcePlaceholder}</option>
            {copy.sourceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
          {copy.error} <a href="mailto:hello@forgingapps.com" className="text-forge-gold hover:text-forge-ember transition underline">hello@forgingapps.com</a>.
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? copy.sending : t('formSubmit')}
      </button>
    </form>
  )
}
