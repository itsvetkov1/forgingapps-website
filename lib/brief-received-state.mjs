function normalizeLocale(locale) {
  return locale === 'bg' ? 'bg' : 'en'
}

export function mapPersistedMessages(briefId, persistedMessages = []) {
  return persistedMessages.map((message, index) => ({
    id: `${briefId}-${index}-${message.role}`,
    role: message.role === 'user' ? 'user' : 'assistant',
    content: String(message.content ?? ''),
    createdAt: typeof message.created_at === 'string' ? message.created_at : null,
  }))
}

export function deriveBriefReceivedChatState({
  briefId,
  openingMessage,
  persistedMessages = [],
  finalized = false,
  finalizedAt = null,
  summaryPreview = null,
}) {
  const mappedMessages = mapPersistedMessages(briefId, persistedMessages)
  const messages = mappedMessages.length
    ? mappedMessages
    : finalized
      ? []
      : [{ id: `opening-${briefId}`, role: 'assistant', content: openingMessage, createdAt: null }]

  return {
    messages,
    finalized: Boolean(finalized),
    finalizedAt: finalizedAt || null,
    summaryPreview: summaryPreview || null,
    finalizeSent: Boolean(finalized),
    disableComposer: Boolean(finalized),
    showStarterPrompts: !finalized && mappedMessages.length === 0,
  }
}

export function formatLocalizedDate(locale, isoDate) {
  if (!isoDate) return ''
  const normalizedLocale = normalizeLocale(locale)
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(normalizedLocale === 'bg' ? 'bg-BG' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function buildFinalizedBannerModel({ locale, finalizedAt, summaryPreview = null, copy = null }) {
  const normalizedLocale = normalizeLocale(locale)
  const dateLabel = formatLocalizedDate(normalizedLocale, finalizedAt)
  const defaultBannerTemplate = normalizedLocale === 'bg'
    ? 'Резюмето е изпратено до Ивайло на {date}. Той ще се свърже с Вас до 24 часа в работни дни.'
    : `Summary sent to Ivaylo on {date}. He'll be in touch within 24 hours on business days.`
  const bannerTemplate = copy?.banner ?? defaultBannerTemplate
  const bannerText = bannerTemplate.replace('{date}', dateLabel)

  if (!summaryPreview) {
    return { dateLabel, bannerText, recapLine: null }
  }

  const topicLabel = copy?.topicLabel ?? (normalizedLocale === 'bg' ? 'Тема' : 'Topic')
  const nextStepLabel = copy?.nextStepLabel ?? (normalizedLocale === 'bg' ? 'Следваща стъпка' : 'Next step')
  const project = String(summaryPreview.project ?? '').trim()
  const nextStep = String(summaryPreview.next_step ?? '').trim()
  const recapParts = []
  if (project) recapParts.push(`${topicLabel}: ${project}`)
  if (nextStep) recapParts.push(`${nextStepLabel}: ${nextStep}`)

  return {
    dateLabel,
    bannerText,
    recapLine: recapParts.length ? recapParts.join(' · ') : null,
  }
}
