import fs from 'node:fs'
import { Resend } from 'resend'
import {
  conversationSummaryEmail,
  internalLeadNotification,
  meetingConfirmation,
} from './ember-email.mjs'

const GATEWAY_ENV_PATH = '/opt/alpharius/config/gateway.env'
const FROM_EMAIL = process.env.EMBER_FROM_EMAIL || 'ember@forgingapps.com'
const REPLY_TO = process.env.EMBER_REPLY_TO || 'hello@forgingapps.com'
const TEAM_EMAIL = process.env.EMBER_TEAM_EMAIL || 'hello@forgingapps.com'

let resendClient = null
let cachedApiKey = null

function parseGatewayEnv(raw) {
  const env = {}
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/)
    if (!match) continue
    const [, key, value] = match
    env[key] = value.replace(/^['\"]|['\"]$/g, '')
  }
  return env
}

function getResendApiKey() {
  if (cachedApiKey) return cachedApiKey
  if (process.env.RESEND_API_KEY) {
    cachedApiKey = process.env.RESEND_API_KEY
    return cachedApiKey
  }

  if (fs.existsSync(GATEWAY_ENV_PATH)) {
    const parsed = parseGatewayEnv(fs.readFileSync(GATEWAY_ENV_PATH, 'utf8'))
    if (parsed.RESEND_API_KEY) {
      cachedApiKey = parsed.RESEND_API_KEY
      return cachedApiKey
    }
  }

  return ''
}

function getResendClient() {
  if (resendClient) return resendClient
  const apiKey = getResendApiKey()
  if (!apiKey) return null
  resendClient = new Resend(apiKey)
  return resendClient
}

async function safeSend({ to, subject, html, text, cc }) {
  const client = getResendClient()
  if (!client) {
    console.warn('[ember-resend] missing RESEND_API_KEY; skipping email send')
    return { ok: false, skipped: true, reason: 'missing_api_key' }
  }

  try {
    const result = await client.emails.send({
      from: FROM_EMAIL,
      to,
      cc,
      replyTo: REPLY_TO,
      subject,
      html,
      text,
    })
    console.log('[ember-resend] email sent', { to, subject, id: result.data?.id || null })
    return { ok: true, id: result.data?.id || null }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown resend error'
    console.error('[ember-resend] send failed', { to, subject, message })
    return { ok: false, error: message }
  }
}

export async function sendInternalNotification(visitorInfo, conversationSummary, leadQuality) {
  const payload = internalLeadNotification(visitorInfo, conversationSummary, leadQuality)
  return safeSend({
    to: TEAM_EMAIL,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  })
}

export async function sendVisitorSummary(visitorName, visitorEmail, conversationHighlights) {
  const payload = conversationSummaryEmail(visitorName, visitorEmail, conversationHighlights)
  return safeSend({
    to: visitorEmail,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  })
}

export async function sendMeetingConfirmation(visitorName, visitorEmail, meetingDetails) {
  const payload = meetingConfirmation(visitorName, visitorEmail, meetingDetails)
  return safeSend({
    to: visitorEmail,
    cc: TEAM_EMAIL,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
  })
}
