'use client'

import Link from 'next/link'
import { Suspense, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MultiSelect from '@/components/MultiSelect'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'
import { contactFormConfigs, resolveContactFormVariant, type ContactFormVariant, type FormVariantConfig } from '@/lib/contactFormConfigs'
import { buildBriefReceivedPath, extractBriefIdFromSubmissionResponse } from '@/lib/brief-received-routing.mjs'

interface ContactFormProps {
  packagePreselect?: string
  variant?: string
  productParam?: string | null
  subjectParam?: string | null
}

type VariantFieldValue = string | string[]
type VariantFormState = Record<string, VariantFieldValue>
type FieldErrors = Record<string, string>

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
    directEmailLabel: 'email us directly',
    sending: 'Sending...',
    validationRequired: 'Please complete this field.',
    validationEmail: 'Please enter a valid email address.',
    honeypotLabel: 'Leave this field empty',
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
    directEmailLabel: 'пишете ни директно по имейл',
    sending: 'Изпращане...',
    validationRequired: 'Моля, попълнете това поле.',
    validationEmail: 'Моля, въведете валиден имейл адрес.',
    honeypotLabel: 'Оставете това поле празно',
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

const genericRequiredFields = ['name', 'email', 'message'] as const
const honeypotFieldName = 'website'

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

function createFieldId(name: string) {
  return `contact-form-${name}`
}

function createErrorId(name: string) {
  return `${createFieldId(name)}-error`
}

function createHelpId(name: string) {
  return `${createFieldId(name)}-help`
}

function joinDescriptorIds(...ids: Array<string | undefined>) {
  const value = ids.filter(Boolean).join(' ')
  return value || undefined
}

function isBlankValue(value: VariantFieldValue) {
  if (Array.isArray(value)) {
    return value.length === 0
  }

  return value.trim() === ''
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
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
  const router = useRouter()
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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [honeypot, setHoneypot] = useState('')

  useEffect(() => {
    setSourcePage(document.referrer || window.location.href)
  }, [])

  useEffect(() => {
    setFieldErrors({})
    setHoneypot('')

    if (variantConfig) {
      setVariantFormData(buildVariantState(variantConfig))
      return
    }

    const preset = subjectParam
      ? subjectPresets[language][subjectParam as keyof (typeof subjectPresets)[typeof language]] ?? subjectParam
      : ''

    setGenericFormData(buildGenericState(defaultPackage, preset))
  }, [defaultPackage, language, subjectParam, variantConfig])

  const focusField = (fieldName: string) => {
    window.requestAnimationFrame(() => {
      const field = document.getElementById(createFieldId(fieldName))
      if (field instanceof HTMLElement) {
        field.focus()
      }
    })
  }

  const validateGenericForm = () => {
    const nextErrors: FieldErrors = {}

    for (const fieldName of genericRequiredFields) {
      if (!genericFormData[fieldName].trim()) {
        nextErrors[fieldName] = copy.validationRequired
      }
    }

    if (genericFormData.email.trim() && !isValidEmail(genericFormData.email)) {
      nextErrors.email = copy.validationEmail
    }

    return nextErrors
  }

  const validateVariantForm = () => {
    const nextErrors: FieldErrors = {}

    if (!variantConfig) return nextErrors

    for (const field of variantConfig.fields) {
      const value = variantFormData[field.name] ?? (field.type === 'multiselect' ? [] : '')

      if (field.required && isBlankValue(value)) {
        nextErrors[field.name] = copy.validationRequired
        continue
      }

      if (field.type === 'email' && typeof value === 'string' && value.trim() && !isValidEmail(value)) {
        nextErrors[field.name] = copy.validationEmail
      }
    }

    return nextErrors
  }

  const clearFieldError = (fieldName: string) => {
    setFieldErrors((prev) => {
      if (!prev[fieldName]) return prev
      const next = { ...prev }
      delete next[fieldName]
      return next
    })
  }

  const handleGenericChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    clearFieldError(name)
    setGenericFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleVariantChange = (name: string, value: VariantFieldValue) => {
    clearFieldError(name)
    setVariantFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetVariantForm = (activeVariant: ContactFormVariant) => {
    setVariantFormData(buildVariantState(contactFormConfigs[activeVariant]))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(false)

    if (honeypot.trim()) {
      setSubmitted(true)
      setHoneypot('')
      return
    }

    const nextErrors = variantConfig ? validateVariantForm() : validateGenericForm()

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors)
      const firstErrorField = Object.keys(nextErrors)[0]
      if (firstErrorField) {
        focusField(firstErrorField)
      }
      return
    }

    setLoading(true)
    setFieldErrors({})

    const payload = variantConfig && resolvedVariant
      ? {
          ...normalizeVariantPayload(variantFormData),
          product_tag: variantConfig.hiddenValues.product_tag,
          budget_range: variantConfig.hiddenValues.budget_range || (typeof variantFormData.budget === 'string' ? variantFormData.budget : ''),
          source_page: sourcePage,
          [honeypotFieldName]: honeypot,
        }
      : {
          ...genericFormData,
          product_tag: 'general',
          source_page: sourcePage,
          [honeypotFieldName]: honeypot,
        }

    try {
      const response = await fetch('https://hooks.forgingapps.com/webhook/contact-form-lead', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })

      const responseText = await response.text()

      if (response.ok) {
        const briefId = extractBriefIdFromSubmissionResponse(responseText)

        setHoneypot('')
        if (variantConfig && resolvedVariant) {
          resetVariantForm(resolvedVariant)
        } else {
          const preset = subjectParam
            ? subjectPresets[language][subjectParam as keyof (typeof subjectPresets)[typeof language]] ?? subjectParam
            : ''
          setGenericFormData(buildGenericState(defaultPackage, preset))
        }

        if (briefId) {
          try {
            const briefResponse = await fetch(`https://chat.forgingapps.com/intake/brief/${encodeURIComponent(briefId)}`, {
              headers: { Accept: 'application/json' },
            })

            if (briefResponse.ok) {
              router.push(buildBriefReceivedPath(language, briefId))
              return
            }
          } catch {
            // Preserve the confirmed-success fallback below until the brief endpoint is live.
          }
        }

        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    }

    setLoading(false)
  }

  const renderFieldError = (fieldName: string) => {
    const message = fieldErrors[fieldName]
    if (!message) return null

    return (
      <p
        id={createErrorId(fieldName)}
        data-test={`contact-form-error-${fieldName}`}
        className="mt-2 text-sm text-red-300"
        role="alert"
      >
        {message}
      </p>
    )
  }

  if (submitted) {
    if (variantCopy?.success) {
      return (
        <div data-test="contact-form-success" className="rounded-lg border border-forge-gold bg-forge-stone p-8 text-center">
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
      <div data-test="contact-form-success" className="rounded-lg border border-forge-gold bg-forge-stone p-8 text-center">
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
    const fieldId = createFieldId(field.name)
    const hasError = Boolean(fieldErrors[field.name])
    const describedBy = joinDescriptorIds(hasError ? createErrorId(field.name) : undefined)

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className={wrapperClass}>
          <label htmlFor={fieldId} className="mb-2 block text-sm font-semibold text-forge-gold">{label}{field.required ? ' *' : ''}</label>
          <textarea
            id={fieldId}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => handleVariantChange(field.name, event.target.value)}
            placeholder={placeholder}
            required={field.required}
            rows={field.rows ?? 4}
            aria-invalid={hasError ? 'true' : undefined}
            aria-describedby={describedBy}
            className={inputClass}
          />
          {renderFieldError(field.name)}
        </div>
      )
    }

    if (field.type === 'select') {
      return (
        <div key={field.name} className={wrapperClass}>
          <label htmlFor={fieldId} className="mb-2 block text-sm font-semibold text-forge-gold">{label}{field.required ? ' *' : ''}</label>
          <select
            id={fieldId}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(event) => handleVariantChange(field.name, event.target.value)}
            required={field.required}
            aria-invalid={hasError ? 'true' : undefined}
            aria-describedby={describedBy}
            className={inputClass}
          >
            <option value="">{placeholder || copy.selectPlaceholder}</option>
            {(options ?? []).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {renderFieldError(field.name)}
        </div>
      )
    }

    if (field.type === 'multiselect') {
      return (
        <div key={field.name} className={wrapperClass}>
          <label htmlFor={fieldId} className="mb-2 block text-sm font-semibold text-forge-gold">{label}{field.required ? ' *' : ''}</label>
          <div id={fieldId} aria-describedby={describedBy} aria-invalid={hasError ? 'true' : undefined}>
            <MultiSelect
              label={placeholder}
              options={options ?? []}
              value={Array.isArray(value) ? value : []}
              onChange={(selected) => handleVariantChange(field.name, selected)}
            />
          </div>
          {renderFieldError(field.name)}
        </div>
      )
    }

    return (
      <div key={field.name} className={wrapperClass}>
        <label htmlFor={fieldId} className="mb-2 block text-sm font-semibold text-forge-gold">{label}{field.required ? ' *' : ''}</label>
        <input
          id={fieldId}
          type={field.type}
          name={field.name}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => handleVariantChange(field.name, event.target.value)}
          placeholder={placeholder || label}
          required={field.required}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy}
          className={inputClass}
        />
        {renderFieldError(field.name)}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-test="contact-form" data-variant={resolvedVariant ?? 'generic'} noValidate>
      <div style={{display:'none'}} aria-hidden="true">
        <label htmlFor={createFieldId(honeypotFieldName)}>{copy.honeypotLabel}</label>
        <input
          id={createFieldId(honeypotFieldName)}
          name={honeypotFieldName}
          type="text"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

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
              <label htmlFor={createFieldId('name')} className="mb-2 block text-sm font-semibold text-forge-gold">{t('formName')} *</label>
              <input id={createFieldId('name')} data-test="contact-form-name" type="text" name="name" value={genericFormData.name} onChange={handleGenericChange} placeholder={t('formName')} required aria-invalid={fieldErrors.name ? 'true' : undefined} aria-describedby={joinDescriptorIds(fieldErrors.name ? createErrorId('name') : undefined)} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none" />
              {renderFieldError('name')}
            </div>
            <div>
              <label htmlFor={createFieldId('email')} className="mb-2 block text-sm font-semibold text-forge-gold">{t('formEmail')} *</label>
              <input id={createFieldId('email')} data-test="contact-form-email" type="email" name="email" value={genericFormData.email} onChange={handleGenericChange} placeholder="your.name@company.com" required aria-invalid={fieldErrors.email ? 'true' : undefined} aria-describedby={joinDescriptorIds(fieldErrors.email ? createErrorId('email') : undefined)} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none" />
              {renderFieldError('email')}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor={createFieldId('phone')} className="mb-2 block text-sm font-semibold text-forge-gold">{t('formPhone')}</label>
              <input id={createFieldId('phone')} data-test="contact-form-phone" type="tel" name="phone" value={genericFormData.phone} onChange={handleGenericChange} placeholder="+359..." aria-invalid={fieldErrors.phone ? 'true' : undefined} aria-describedby={joinDescriptorIds(fieldErrors.phone ? createErrorId('phone') : undefined)} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none" />
              {renderFieldError('phone')}
            </div>
            <div>
              <label htmlFor={createFieldId('packageInterest')} className="mb-2 block text-sm font-semibold text-forge-gold">{t('formPackage')}</label>
              <select id={createFieldId('packageInterest')} name="packageInterest" value={genericFormData.packageInterest} onChange={handleGenericChange} aria-invalid={fieldErrors.packageInterest ? 'true' : undefined} aria-describedby={joinDescriptorIds(fieldErrors.packageInterest ? createErrorId('packageInterest') : undefined)} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none">
                <option>{t('packageOptions.notSure')}</option>
                <option>{t('packageOptions.spark')}</option>
                <option>{t('packageOptions.ember')}</option>
                <option>{t('packageOptions.anvil')}</option>
                <option>{t('packageOptions.forge')}</option>
                <option>{t('packageOptions.oracle')}</option>
                <option>{t('packageOptions.hearthstone')}</option>
              </select>
              {renderFieldError('packageInterest')}
            </div>
          </div>

          <div>
            <label htmlFor={createFieldId('subject')} className="mb-2 block text-sm font-semibold text-forge-gold">{copy.subjectLabel}</label>
            <input id={createFieldId('subject')} type="text" name="subject" value={genericFormData.subject} onChange={handleGenericChange} placeholder={copy.subjectPlaceholder} aria-invalid={fieldErrors.subject ? 'true' : undefined} aria-describedby={joinDescriptorIds(fieldErrors.subject ? createErrorId('subject') : undefined)} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none" />
            {renderFieldError('subject')}
          </div>

          <div>
            <label htmlFor={createFieldId('message')} className="mb-2 block text-sm font-semibold text-forge-gold">{t('formProject')} *</label>
            <textarea id={createFieldId('message')} data-test="contact-form-message" name="message" value={genericFormData.message} onChange={handleGenericChange} placeholder={t('formProjectHelper')} required rows={5} aria-invalid={fieldErrors.message ? 'true' : undefined} aria-describedby={joinDescriptorIds(createHelpId('message'), fieldErrors.message ? createErrorId('message') : undefined)} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none"></textarea>
            <p id={createHelpId('message')} className="mt-2 text-xs text-gray-500">{t('formProjectHelper')}</p>
            {renderFieldError('message')}
          </div>

          <div>
            <label htmlFor={createFieldId('source')} className="mb-2 block text-sm font-semibold text-forge-gold">{t('formSource')}</label>
            <select id={createFieldId('source')} name="source" value={genericFormData.source} onChange={handleGenericChange} aria-invalid={fieldErrors.source ? 'true' : undefined} aria-describedby={joinDescriptorIds(fieldErrors.source ? createErrorId('source') : undefined)} className="w-full rounded-lg border border-forge-stone bg-forge-dark px-4 py-2 text-white transition focus:border-forge-gold focus:outline-none">
              <option value="">{copy.sourcePlaceholder}</option>
              {copy.sourceOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
            {renderFieldError('source')}
          </div>
        </>
      )}

      {error ? (
        <div className="rounded-lg border border-red-500/50 bg-red-900/30 p-4 text-sm text-red-300">
          {copy.error} <a href="mailto:hello@forgingapps.com" className="text-forge-gold underline transition hover:text-forge-ember">{copy.directEmailLabel}</a>.
        </div>
      ) : null}

      <button data-test="contact-form-submit" type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
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
