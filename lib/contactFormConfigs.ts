export const contactFormVariants = [
  'spark',
  'blaze',
  'anvil',
  'forge',
  'ai-readiness',
  'ai-chat-assistant',
  'oracle',
  'discovery-workshop',
  'hearthstone',
] as const

export type ContactFormVariant = (typeof contactFormVariants)[number]

export type ContactFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'multiselect'

export interface ContactFormFieldConfig {
  name: string
  type: ContactFieldType
  required?: boolean
  rows?: number
}

export interface FormVariantConfig {
  i18nKey: ContactFormVariant
  fields: ContactFormFieldConfig[]
  hiddenValues: {
    product_tag: ContactFormVariant
    budget_range?: string
  }
  showPriceNote?: boolean
  showPhoneField: boolean
}

export const legacySubjectVariantMap: Record<string, ContactFormVariant> = {
  'ai-readiness': 'ai-readiness',
  'custom-ai-assistant': 'ai-chat-assistant',
  'oracle-consulting': 'oracle',
  'discovery-workshop': 'discovery-workshop',
}

export const contactFormConfigs: Record<ContactFormVariant, FormVariantConfig> = {
  spark: {
    i18nKey: 'spark',
    showPriceNote: true,
    showPhoneField: true,
    hiddenValues: { product_tag: 'spark', budget_range: '1500-2500' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'tel' },
      { name: 'businessName', type: 'text', required: true },
      { name: 'landingPagePurpose', type: 'select', required: true },
      { name: 'brandingStatus', type: 'select', required: true },
      { name: 'contentStatus', type: 'select', required: true },
      { name: 'idealLaunchDate', type: 'text' },
      { name: 'notes', type: 'textarea', rows: 3 },
    ],
  },
  blaze: {
    i18nKey: 'blaze',
    showPhoneField: true,
    hiddenValues: { product_tag: 'blaze' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'tel' },
      { name: 'businessName', type: 'text', required: true },
      { name: 'buildType', type: 'select', required: true },
      { name: 'currentWebsite', type: 'text' },
      { name: 'keyFeatures', type: 'textarea', required: true, rows: 3 },
      { name: 'contentAndBranding', type: 'select', required: true },
      { name: 'timeline', type: 'select' },
      { name: 'budget', type: 'select' },
      { name: 'notes', type: 'textarea', rows: 3 },
    ],
  },
  anvil: {
    i18nKey: 'anvil',
    showPhoneField: true,
    hiddenValues: { product_tag: 'anvil' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'tel' },
      { name: 'company', type: 'text', required: true },
      { name: 'role', type: 'text' },
      { name: 'productOverview', type: 'textarea', required: true, rows: 4 },
      { name: 'platform', type: 'select', required: true },
      { name: 'usersDayOne', type: 'select' },
      { name: 'specStatus', type: 'select', required: true },
      { name: 'techStack', type: 'text' },
      { name: 'timeline', type: 'select' },
      { name: 'budget', type: 'select' },
      { name: 'notes', type: 'textarea', rows: 3 },
    ],
  },
  forge: {
    i18nKey: 'forge',
    showPhoneField: true,
    hiddenValues: { product_tag: 'forge' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'tel' },
      { name: 'company', type: 'text', required: true },
      { name: 'role', type: 'text', required: true },
      { name: 'vision', type: 'textarea', required: true, rows: 5 },
      { name: 'platform', type: 'select', required: true },
      { name: 'currentStage', type: 'select', required: true },
      { name: 'team', type: 'select' },
      { name: 'specStatus', type: 'select', required: true },
      { name: 'techStack', type: 'text' },
      { name: 'timeline', type: 'select' },
      { name: 'budget', type: 'select' },
      { name: 'source', type: 'select' },
      { name: 'notes', type: 'textarea', rows: 3 },
    ],
  },
  'ai-readiness': {
    i18nKey: 'ai-readiness',
    showPriceNote: true,
    showPhoneField: false,
    hiddenValues: { product_tag: 'ai-readiness', budget_range: '1500-2500' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'company', type: 'text', required: true },
      { name: 'industry', type: 'select' },
      { name: 'aiInterest', type: 'textarea', required: true, rows: 3 },
      { name: 'currentTools', type: 'text' },
      { name: 'teamSize', type: 'select' },
      { name: 'aiToolsTried', type: 'select' },
    ],
  },
  'ai-chat-assistant': {
    i18nKey: 'ai-chat-assistant',
    showPriceNote: true,
    showPhoneField: false,
    hiddenValues: { product_tag: 'ai-chat-assistant', budget_range: '2500-fixed' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'company', type: 'text', required: true },
      { name: 'assistantLocation', type: 'select', required: true },
      { name: 'assistantGoal', type: 'textarea', required: true, rows: 3 },
      { name: 'contentSource', type: 'select', required: true },
      { name: 'volume', type: 'select' },
      { name: 'brandingNeeds', type: 'select' },
    ],
  },
  oracle: {
    i18nKey: 'oracle',
    showPhoneField: true,
    hiddenValues: { product_tag: 'oracle' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'tel' },
      { name: 'company', type: 'text', required: true },
      { name: 'role', type: 'text', required: true },
      { name: 'challenge', type: 'textarea', required: true, rows: 4 },
      { name: 'currentAiUsage', type: 'select' },
      { name: 'helpType', type: 'multiselect' },
      { name: 'engagementSize', type: 'select' },
      { name: 'urgency', type: 'select' },
      { name: 'source', type: 'select' },
    ],
  },
  'discovery-workshop': {
    i18nKey: 'discovery-workshop',
    showPriceNote: true,
    showPhoneField: false,
    hiddenValues: { product_tag: 'discovery-workshop', budget_range: '500-800' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'company', type: 'text', required: true },
      { name: 'problemToSolve', type: 'textarea', required: true, rows: 3 },
      { name: 'currentStage', type: 'select', required: true },
      { name: 'workshopFormat', type: 'select' },
    ],
  },
  hearthstone: {
    i18nKey: 'hearthstone',
    showPhoneField: true,
    hiddenValues: { product_tag: 'hearthstone' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
      { name: 'phone', type: 'tel' },
      { name: 'company', type: 'text', required: true },
      { name: 'existingClient', type: 'select', required: true },
      { name: 'retainerTier', type: 'select', required: true },
      { name: 'supportNeeds', type: 'multiselect' },
      { name: 'techStack', type: 'text' },
      { name: 'notes', type: 'textarea', rows: 3 },
    ],
  },
}

export function isKnownContactFormVariant(value: string | null | undefined): value is ContactFormVariant {
  return Boolean(value && value in contactFormConfigs)
}

export function resolveContactFormVariant(product: string | null | undefined, subject: string | null | undefined): ContactFormVariant | undefined {
  if (isKnownContactFormVariant(product)) return product
  if (!subject) return undefined
  return legacySubjectVariantMap[subject]
}
