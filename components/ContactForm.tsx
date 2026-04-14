'use client'

import Link from 'next/link'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import MultiSelect from '@/components/MultiSelect'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'
import { contactFormConfigs, resolveContactFormVariant, type ContactFormVariant, type FormVariantConfig } from '@/lib/contactFormConfigs'

interface ContactFormProps {
  packagePreselect?: string
  variant?: string
  productParam?: string | null
  subjectParam?: string | null
}

type VariantFieldValue = string | string[]
type VariantFormState = Record<string, VariantFieldValue>

interface GenericFormState {
  name: string
  email: string
  phone: string
  subject: string
  packageInterest: string
  message: string
  source: string
}

const genericCopy = {
  en: {
    submittedTitle: 'We Got Your Message!',
    submittedNext: "Here's what happens next:",
    submittedStep1: 'We read your brief carefully, usually the same day.',
    submittedStep2: 'We prepare a quick assessment: fit, approach, and ballpark.',
    submittedStep3: 'You hear from us within 24 hours on business days.',
    submittedDemoPrompt: 'Want to see our work first?',
    submittedDemoLink: 'Try the live demo →',
    sendAnother: '← Send another message',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'What would you like to discuss?',
    sourcePlaceholder: 'Select source...',
    sourceOptions: ['Google Search', 'Social Media', 'Referral', 'Other'],
    selectPlaceholder: 'Select...',
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
    sourcePlaceholder: 'Изберете източник...',
    sourceOptions: ['Google търсене', 'Социални мрежи', 'Препоръка', 'Друго'],
    selectPlaceholder: 'Изберете...',
    error: 'Нещо се обърка. Моля, опитайте отново или ни пишете директно на',
    sending: 'Изпращане...',
  },
} as const

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

function buildGenericState(defaultPackage: string, subject = ''): GenericFormState {
  return {
    name: '',
    email: '',
    phone: '',
    subject,
    packageInterest: defaultPackage,
    message: '',
    source: '',
  }
}

function buildVariantState(config: FormVariantConfig): VariantFormState {
  return config.fields.reduce<VariantFormState>((acc, field) => {
    acc[field.name] = field.type === 'multiselect' ? [] : ''
    return acc
  }, {})
}

function normalizeVariantPayload(values: VariantFormState): Record<string, string> {
  return Object.entries(values).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value.join(', ') : value
    return acc
  }, {})
}

function ContactFormWithSearch(props: ContactFormProps) {
  const searchParams = useSearchParams()
  return (
    <ContactFormRenderer
      {...props}
      productParam={props.productParam ?? searchParams.get('product')}
      subjectParam={props.subjectParam ?? searchParams.get('subject')}
    />
  )
}

function ContactFormRenderer({ packagePreselect, variant, productParam, subjectParam }: ContactFormProps) {
  const { t, language } = useTranslation('contact')
  const { localePath } = useLanguage()
  const copy = genericCopy[language]
  const contactForms = translations[language].contactForms ?? {}
  const defaultPackage = packagePreselect || t('packageOptions.notSure')

  const resolvedVariant = useMemo(
    () => resolveContactFormVariant(variant ?? productParam, subjectParam),
    [productParam, subjectParam, variant],
  )

  const variantConfig = resolvedVariant ? contactFormConfigs[resolvedVariant] : undefined
  const variantCopy = resolvedVariant ? contactForms[resolvedVariant] : undefined

  const [genericFormData, setGenericFormData] = useState<GenericFormState>(() => buildGenericState(defaultPackage))
  const [variantFormData, setVariantFormData] = useState<VariantFormState>(() => (variantConfig ? buildVariantState(variantConfig) : {}))
  const [sourcePage, setSourcePage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setSourcePage(document.referrer || window.location.href)
  }, [])

  useEffect(() => {
    if (variantConfig) {
      setVariantFormData(buildVariantState(variantConfig))
      return
    }

    const preset = subjectParam
      ? subjectPresets[language][subjectParam as keyof (typeof subjectPresets)[typeof language]] ?? subjectParam
      : ''

    setGenericFormData(buildGenericState(defaultPackage, preset))
  }, [defaultPackage, language, subjectParam, variantConfig])

  const handleGenericChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setGenericFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVariantChange = (name: string, value: VariantFieldValue) => {
    setVariantFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetVariantForm = (activeVariant: ContactFormVariant) => {
    setVariantFormData(buildVariantState(contactFormConfigs[activeVariant]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const payload = variantConfig && resolvedVariant
      ? {
          ...normalizeVariantPayload(variantFormData),
          product_tag: variantConfig.hiddenValues.product_tag,
          budget_range: variantConfig.hiddenValues.budget_range || (typeof variantFormData.budget === 'string' ? variantFormData.budget : ''),
          source_page: sourcePage,
        }
      : {
          ...genericFormData,
          product_tag: 'general',
          source_page: sourcePage,
        }

    try {
      const response = await fetch('https://hooks.forgingapps.com/webhook/contact-form-lead', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        setSubmitted(true)
        if (variantConfig && resolvedVariant) {
          resetVariantForm(resolvedVariant)
        } else {
          const preset = subjectParam
            ? subjectPresets[language][subjectParam as keyof (typeof subjectPresets)[typeof language]] ?? subjectParam
            : ''
          setGenericFormData(buildGenericState(defaultPackage, preset))
        }
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }

    setLoading(false)
  }

  if (submitted) {
    if (variantCopy?.success) {
      return (
        <div className="rounded-lg border border-forge-gold bg-forge-stone p-8 text-center">
          <div className="mb-4 text-5xl">✓</div>
          <h3 className="mb-2 font-cinzel text-2xl font-bold text-forge-gold">{variantCopy.success.title}</h3>
          <p className="mb-6 text-gray-300">{variantCopy.success.description}</p>
          <div className="mb-6 space-y-3 rounded-lg border border-forge-ember/20 bg-forge-dark p-4 text-left">
            {variantCopy.success.steps.map((step: string, index: number) => (
              <div key={step} className="flex items-start gap-3">
                <span className="font-bold text-forge-ember">{index + 1}.</span>
                <p className="text-sm text-gray-300">{step}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs text-gray-500 transition hover:text-gray-300"
          >
            {copy.sendAnother}
          </button>
        </div>
      )
    }

    return (
      <div className="rounded-lg border border-forge-gold bg-forge-stone p-8 text-center">
        <div className="mb-4 text-5xl">✓</div>
        <h3 className="mb-2 font-cinzel text-2xl font-bold text-forge-gold">{copy.submittedTitle}</h3>
        <p className="mb-6 text-gray-300">{copy.submittedNext}</p>
        <div className="mb-6 space-y-3 rounded-lg border border-forge-ember/20 bg-forge-dark p-4 text-left">
          <div className="flex items-start gap-3">
            <span className="font-bold text-forge-ember">1.</span>
            <p className="text-sm text-gray-300">{copy.submittedStep1}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-forge-ember">2.</span>
            <p className="text-sm text-gray-300">{copy.submittedStep2}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-forge-ember">3.</span>
            <p className="text-sm text-gray-300">{copy.submittedStep3}</p>
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-400">{copy.submittedDemoPrompt}</p>
        <Link href={localePath('/demo')} className="text-sm font-semibold text-forge-gold transition hover:text-forge-ember">
          {copy.submittedDemoLink}
        </Link>
        <div className="mt-4 border-t border-forge-ember/20 pt-4">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs text-gray-500 transition hover:text-gray-300"
          >
            {copy.sendAnother}
          </button>
        </div>
      </div>
    )
  }

  const renderVariantField = (field: FormVariantConfig['fields'][number]) => {
    if (!variantCopy) return null

    const fieldCopy = variantCopy.fields?.[field.name]
    const value = variantFormData[field.name] ?? (field.type === 'multiselect' ? [] : '')
    const label = fieldCopy?.label || field.name
    const placeholder = fieldCopy?.placeholder
    const options = fieldCopy?.options as string[] | undefined
    const isFullWidth = field.type === 'textarea' || field.type === 'multiselect'
    const wrapperClass = isFullWidth ? 'md:col-span-2' : ''
    const inputClass = 'w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:outline-none focus:border-forge-gold'

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className={wrapperClass}>
          <label className="mb-2 block text-sm font-semibold text-forge-gold">{label}{field.required ? ' *' : ''}</label>
          <textarea
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => handleVariantChange(field.name, e.target.value)}
            placeholder={placeholder}
            required={field.required}
            rows={field.rows ?? 4}
            className={inputClass}
          />
        </div>
      )
    }

    if (field.type === 'select') {
      return (
        <div key={field.name} className={wrapperClass}>
          <label className="mb-2 block text-sm font-semibold text-forge-gold">{label}{field.required ? ' *' : ''}</label>
          <select
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => handleVariantChange(field.name, e.target.value)}
            required={field.required}
            className={inputClass}
          >
            <option value="">{placeholder || copy.selectPlaceholder}</option>
            {(options ?? []).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      )
    }

    if (field.type === 'multiselect') {
      return (
        <div key={field.name} className={wrapperClass}>
          <label className="mb-2 block text-sm font-semibold text-forge-gold">{label}{field.required ? ' *' : ''}</label>
          <MultiSelect
            label={placeholder}
            options={options ?? []}
            value={Array.isArray(value) ? value : []}
            onChange={(selected) => handleVariantChange(field.name, selected)}
          />
        </div>
      )
    }

    return (
      <div key={field.name} className={wrapperClass}>
        <label className="mb-2 block text-sm font-semibold text-forge-gold">{label}{field.required ? ' *' : ''}</label>
        <input
          type={field.type}
          name={field.name}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => handleVariantChange(field.name, e.target.value)}
          placeholder={placeholder || label}
          required={field.required}
          className={inputClass}
        />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {variantConfig && variantCopy ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {variantConfig.fields.map(renderVariantField)}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-forge-gold">{t('formName')} *</label>
              <input type="text" name="name" value={genericFormData.name} onChange={handleGenericChange} placeholder={t('formName')} required className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-forge-gold">{t('formEmail')} *</label>
              <input type="email" name="email" value={genericFormData.email} onChange={handleGenericChange} placeholder="your.name@company.com" required className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-forge-gold">{t('formPhone')}</label>
              <input type="tel" name="phone" value={genericFormData.phone} onChange={handleGenericChange} placeholder="+359..." className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-forge-gold">{t('formPackage')}</label>
              <select name="packageInterest" value={genericFormData.packageInterest} onChange={handleGenericChange} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none">
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
            <label className="mb-2 block text-sm font-semibold text-forge-gold">{copy.subjectLabel}</label>
            <input type="text" name="subject" value={genericFormData.subject} onChange={handleGenericChange} placeholder={copy.subjectPlaceholder} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-forge-gold">{t('formProject')} *</label>
            <textarea name="message" value={genericFormData.message} onChange={handleGenericChange} placeholder={t('formProjectHelper')} required rows={5} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none"></textarea>
            <p className="mt-2 text-xs text-gray-500">{t('formProjectHelper')}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-forge-gold">{t('formSource')}</label>
            <select name="source" value={genericFormData.source} onChange={handleGenericChange} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none">
              <option value="">{copy.sourcePlaceholder}</option>
              {copy.sourceOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
        </>
      )}

      {error ? (
        <div className="rounded-lg border border-red-500/50 bg-red-900/30 p-4 text-sm text-red-300">
          {copy.error} <a href="mailto:hello@forgingapps.com" className="text-forge-gold underline transition hover:text-forge-ember">hello@forgingapps.com</a>.
        </div>
      ) : null}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
        {loading ? copy.sending : t('formSubmit')}
      </button>
    </form>
  )
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={<ContactFormRenderer {...props} />}>
      <ContactFormWithSearch {...props} />
    </Suspense>
  )
}
