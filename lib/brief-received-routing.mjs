const BRIEF_RECEIVED_ROUTE = '/brief-received'

export function buildBriefReceivedPath(locale, briefId) {
  return `/${locale}${BRIEF_RECEIVED_ROUTE}?id=${encodeURIComponent(briefId)}`
}

export function extractBriefIdFromSubmissionResponse(payload) {
  if (!payload || typeof payload !== 'string') return null

  try {
    const parsed = JSON.parse(payload)
    return typeof parsed?.brief_id === 'string' && parsed.brief_id.trim() ? parsed.brief_id.trim() : null
  } catch {
    return null
  }
}

export function shouldHideSiteChrome(pathname) {
  if (typeof pathname !== 'string') return false
  return /^\/(en|bg)\/brief-received(?:\.html)?(?:$|[/?#])/.test(pathname)
}
