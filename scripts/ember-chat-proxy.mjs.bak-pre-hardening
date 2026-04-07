import http from 'node:http'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import {
  sendInternalNotification,
  sendMeetingConfirmation,
  sendVisitorSummary,
} from './ember-resend.mjs'

const execFileAsync = promisify(execFile)

const PORT = Number(process.env.PORT || 18893)
const BOT_CONTAINER = process.env.EMBER_CONTAINER || 'ember-openclaw-gateway-1'
const BOT_AGENT = process.env.EMBER_AGENT || 'main'
const BOT_TIMEOUT_MS = Number(process.env.EMBER_TIMEOUT_MS || 120000)
const SESSION_PREFIX = 'ember-web:'
const ORIGIN_ALLOWLIST = new Set([
  'https://forgingapps.com',
  'https://www.forgingapps.com',
  'https://forgingapps.pages.dev',
  'http://localhost:3000',
  'http://localhost:3001',
])
const ACTION_TAG_REGEX = /\[ACTION:([A-Z_]+)(?::([^\]]+))?\]/g
const emailStore = new Map()

function sendJson(res, statusCode, payload, origin = '*') {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(payload))
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 100_000) {
        reject(new Error('Request body too large'))
        req.destroy()
      }
    })
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}) }
      catch (error) { reject(error) }
    })
    req.on('error', reject)
  })
}

function sanitizeVisitorId(value) {
  return String(value || '').trim().replace(/[^a-zA-Z0-9:_-]/g, '-').slice(0, 120)
}

function sanitizeEmail(value) {
  return String(value || '').trim().toLowerCase()
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getSession(visitorId) {
  if (!emailStore.has(visitorId)) {
    emailStore.set(visitorId, {
      visitorId,
      name: '',
      email: '',
      history: [],
      lastSummarySentAt: null,
    })
  }
  return emailStore.get(visitorId)
}

function addHistory(visitorId, role, content) {
  const session = getSession(visitorId)
  session.history.push({ role, content, timestamp: new Date().toISOString() })
  if (session.history.length > 40) {
    session.history = session.history.slice(-40)
  }
}

function summarizeConversation(visitorId) {
  const session = getSession(visitorId)
  const recent = session.history.slice(-10)
  if (!recent.length) return 'No conversation history captured yet.'

  return recent
    .map((entry) => `${entry.role === 'user' ? 'Visitor' : 'Ember'}: ${entry.content}`)
    .join('\n')
}

function conversationHighlights(visitorId) {
  const session = getSession(visitorId)
  const recent = session.history.slice(-8)
  if (!recent.length) {
    return ['You asked Ember about ForgingApps services and next steps.']
  }

  return recent.map((entry) => `${entry.role === 'user' ? 'You asked' : 'Ember covered'}: ${entry.content}`)
}

function inferLeadQuality(visitorId) {
  const session = getSession(visitorId)
  const joined = session.history.map((item) => item.content.toLowerCase()).join(' ')
  const score = [
    /book|call|meeting|schedule/.test(joined) ? 2 : 0,
    /price|pricing|budget|cost/.test(joined) ? 2 : 0,
    /timeline|urgent|soon|this month|next week/.test(joined) ? 2 : 0,
    session.email ? 2 : 0,
    /demo|services|consulting|project/.test(joined) ? 1 : 0,
  ].reduce((sum, value) => sum + value, 0)

  if (score >= 6) return 'hot'
  if (score >= 3) return 'warm'
  return 'cool'
}

function extractReply(rawOutput) {
  const trimmed = String(rawOutput || '').trim()
  let lastError = null
  let result = null
  let searchFrom = 0
  while (true) {
    const jsonStart = trimmed.indexOf('{', searchFrom)
    if (jsonStart === -1) break
    try {
      const candidate = JSON.parse(trimmed.slice(jsonStart))
      if (Array.isArray(candidate?.payloads) && candidate.payloads.length > 0) {
        const firstText = candidate.payloads
          .find((entry) => typeof entry?.text === 'string' && entry.text.trim())
          ?.text?.trim()
        if (firstText) { result = firstText; break }
      }
    } catch (error) { lastError = error }
    searchFrom = jsonStart + 1
  }
  if (result !== null) return result
  throw new Error(lastError?.message || 'Bot returned no reply payload')
}

async function askBot(visitorId, message) {
  const sessionId = SESSION_PREFIX + visitorId
  const session = getSession(visitorId)
  const contextualMessage = session.email
    ? `${message}\n\nSession context: the visitor already shared their email address (${session.email})${session.name ? ` and name (${session.name})` : ''}. If they ask for a summary, follow-up, or booking-related email action, do not ask for the email again.`
    : message
  const args = [
    'exec', BOT_CONTAINER,
    'openclaw', 'agent',
    '--local',
    '--agent', BOT_AGENT,
    '--session-id', sessionId,
    '--message', contextualMessage,
    '--json',
  ]
  const { stdout, stderr } = await execFileAsync('docker', args, {
    timeout: BOT_TIMEOUT_MS,
    maxBuffer: 1024 * 1024,
  })
  return extractReply(stdout + '\n' + stderr)
}

function parseActionTags(reply) {
  const tags = []
  const cleanReply = reply
    .replace(ACTION_TAG_REGEX, (_, rawType, rawValue) => {
      tags.push({
        type: String(rawType || '').toUpperCase(),
        value: rawValue ? String(rawValue).trim() : '',
      })
      return ''
    })
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  return { cleanReply, tags }
}

function inferFallbackTags(visitorId, cleanReply, tags) {
  if (tags.length > 0) return tags
  const session = getSession(visitorId)
  if (session.email) return tags

  if (/best email|email address|share your email|what is it\?|send it to you/i.test(cleanReply)) {
    return [{ type: 'COLLECT_EMAIL', value: '' }]
  }

  return tags
}

async function executeActionTags(visitorId, tags) {
  const session = getSession(visitorId)
  const actions = []

  for (const tag of tags) {
    if (tag.type === 'COLLECT_EMAIL') {
      actions.push({ type: 'collect_email' })
      continue
    }

    if (tag.type === 'INTERNAL_NOTIFY') {
      if (!session.email) {
        actions.push({ type: 'internal_notify', status: 'skipped', reason: 'missing_email' })
        continue
      }
      const result = await sendInternalNotification(
        { visitorId, name: session.name, email: session.email },
        summarizeConversation(visitorId),
        inferLeadQuality(visitorId),
      )
      actions.push({ type: 'internal_notify', status: result.ok ? 'sent' : result.skipped ? 'skipped' : 'failed' })
      continue
    }

    if (tag.type === 'SEND_SUMMARY') {
      const targetEmail = sanitizeEmail(tag.value || session.email)
      if (!targetEmail || !isValidEmail(targetEmail)) {
        actions.push({ type: 'send_summary', status: 'skipped', reason: 'missing_email' })
        continue
      }
      const result = await sendVisitorSummary(session.name, targetEmail, conversationHighlights(visitorId))
      session.lastSummarySentAt = result.ok ? new Date().toISOString() : session.lastSummarySentAt
      actions.push({ type: 'send_summary', status: result.ok ? 'sent' : result.skipped ? 'skipped' : 'failed', email: targetEmail })
      continue
    }

    if (tag.type === 'MEETING_CONFIRMATION') {
      const targetEmail = sanitizeEmail(tag.value || session.email)
      if (!targetEmail || !isValidEmail(targetEmail)) {
        actions.push({ type: 'meeting_confirmation', status: 'skipped', reason: 'missing_email' })
        continue
      }
      const result = await sendMeetingConfirmation(session.name, targetEmail, {
        topic: 'Discovery call',
      })
      actions.push({ type: 'meeting_confirmation', status: result.ok ? 'sent' : result.skipped ? 'skipped' : 'failed', email: targetEmail })
      continue
    }
  }

  return actions
}

async function handleCollectEmail(body) {
  const visitorId = sanitizeVisitorId(body?.visitorId)
  const email = sanitizeEmail(body?.email)
  const name = String(body?.name || '').trim()

  if (!visitorId || !email || !isValidEmail(email)) {
    return {
      status: 400,
      payload: { ok: false, error: 'visitorId and valid email are required' },
    }
  }

  const session = getSession(visitorId)
  session.email = email
  if (name) session.name = name

  const notifyResult = await sendInternalNotification(
    { visitorId, name: session.name, email: session.email },
    summarizeConversation(visitorId),
    inferLeadQuality(visitorId),
  )

  return {
    status: 200,
    payload: {
      ok: true,
      email,
      actions: [{
        type: 'internal_notify',
        status: notifyResult.ok ? 'sent' : notifyResult.skipped ? 'skipped' : 'failed',
      }],
      message: 'Thanks — got it. We can follow up by email from here.',
    },
  }
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin
  const allowedOrigin = origin && ORIGIN_ALLOWLIST.has(origin) ? origin : '*'

  if (origin && !ORIGIN_ALLOWLIST.has(origin)) {
    sendJson(res, 403, { error: 'Origin not allowed' }, allowedOrigin)
    return
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
      'Cache-Control': 'no-store',
    })
    res.end()
    return
  }

  const url = new URL(req.url, 'http://' + (req.headers.host || '127.0.0.1'))

  try {
    if (req.method === 'GET' && url.pathname === '/health') {
      sendJson(res, 200, { ok: true, service: 'ember-chat-proxy', container: BOT_CONTAINER }, allowedOrigin)
      return
    }

    if (req.method === 'POST' && url.pathname === '/api/ember/message') {
      const body = await parseBody(req)
      const message = String(body?.message || '').trim()
      const visitorId = sanitizeVisitorId(body?.visitorId)

      if (!message || !visitorId) {
        sendJson(res, 400, { error: 'message and visitorId are required' }, allowedOrigin)
        return
      }

      addHistory(visitorId, 'user', message)
      const rawReply = await askBot(visitorId, message)
      const { cleanReply, tags } = parseActionTags(rawReply)
      const effectiveTags = inferFallbackTags(visitorId, cleanReply, tags)
      const actions = await executeActionTags(visitorId, effectiveTags)
      const reply = cleanReply || 'I can help with that. Tell me a bit more.'
      addHistory(visitorId, 'assistant', reply)
      sendJson(res, 200, { reply, actions }, allowedOrigin)
      return
    }

    if (req.method === 'POST' && url.pathname === '/api/ember/collect-email') {
      const body = await parseBody(req)
      const result = await handleCollectEmail(body)
      sendJson(res, result.status, result.payload, allowedOrigin)
      return
    }

    sendJson(res, 404, { error: 'Not found' }, allowedOrigin)
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    console.error('[ember-chat-proxy] error:', msg)
    sendJson(res, 500, { error: msg }, allowedOrigin)
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log('[ember-chat-proxy] listening on http://127.0.0.1:' + PORT)
  console.log('[ember-chat-proxy] container: ' + BOT_CONTAINER)
  console.log('[ember-chat-proxy] agent: ' + BOT_AGENT)
})
