import http from 'node:http'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import {
  sendInternalNotification,
  sendMeetingConfirmation,
  sendVisitorSummary,
} from './ember-resend.mjs'
import { getAllowedOrigin, isAllowedOrigin } from './ember-origin-allowlist.mjs'
import { getProxyTarget } from './ember-proxy-routing.mjs'
import { buildProxyHeaders } from './ember-proxy-headers.mjs'

const execFileAsync = promisify(execFile)

const PORT = Number(process.env.PORT || 18893)
const BOT_CONTAINER = process.env.EMBER_CONTAINER || 'ember-openclaw-gateway-1'
const BOT_AGENT = process.env.EMBER_AGENT || 'main'
const BOT_TIMEOUT_MS = Number(process.env.EMBER_TIMEOUT_MS || 120000)
const SESSION_PREFIX = 'ember-web:'
const ACTION_TAG_REGEX = /\[ACTION:([A-Z_]+)(?::([^\]]+))?\]/g
const emailStore = new Map()

// ============================================================================
// [SECURITY] Rate Limiting & Message Length Validation
// ============================================================================

// [SECURITY] Rate limiting: per-visitor sliding window counters
// Structure: visitorId -> { minuteWindow: { timestamp, count }, hourWindow: { timestamp, count } }
const rateLimitStore = new Map()
const RATE_LIMIT_PER_MINUTE = 10
const RATE_LIMIT_PER_HOUR = 50
const RATE_LIMIT_ACTION_TAG_PER_HOUR = 3
const MESSAGE_MAX_LENGTH = 2000
const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * 60 * 1000

// [SECURITY] Check if visitor has exceeded rate limit (messages)
function checkRateLimit(visitorId) {
  const now = Date.now()
  if (!rateLimitStore.has(visitorId)) {
    rateLimitStore.set(visitorId, {
      minuteWindow: { timestamp: now, count: 0 },
      hourWindow: { timestamp: now, count: 0 },
      actionTagHour: { timestamp: now, count: 0 },
    })
  }

  const limits = rateLimitStore.get(visitorId)

  // Check minute window
  if (now - limits.minuteWindow.timestamp > MINUTE_MS) {
    limits.minuteWindow = { timestamp: now, count: 1 }
  } else {
    limits.minuteWindow.count++
    if (limits.minuteWindow.count > RATE_LIMIT_PER_MINUTE) {
      return {
        exceeded: true,
        window: 'minute',
        limit: RATE_LIMIT_PER_MINUTE,
      }
    }
  }

  // Check hour window
  if (now - limits.hourWindow.timestamp > HOUR_MS) {
    limits.hourWindow = { timestamp: now, count: 1 }
  } else {
    limits.hourWindow.count++
    if (limits.hourWindow.count > RATE_LIMIT_PER_HOUR) {
      return {
        exceeded: true,
        window: 'hour',
        limit: RATE_LIMIT_PER_HOUR,
      }
    }
  }

  return { exceeded: false }
}

// [SECURITY] Check if visitor has exceeded action tag rate limit
function checkActionTagRateLimit(visitorId) {
  const now = Date.now()
  if (!rateLimitStore.has(visitorId)) {
    rateLimitStore.set(visitorId, {
      minuteWindow: { timestamp: now, count: 0 },
      hourWindow: { timestamp: now, count: 0 },
      actionTagHour: { timestamp: now, count: 0 },
    })
  }

  const limits = rateLimitStore.get(visitorId)

  // Check action tag hour window
  if (now - limits.actionTagHour.timestamp > HOUR_MS) {
    limits.actionTagHour = { timestamp: now, count: 1 }
  } else {
    limits.actionTagHour.count++
    if (limits.actionTagHour.count > RATE_LIMIT_ACTION_TAG_PER_HOUR) {
      return {
        exceeded: true,
        limit: RATE_LIMIT_ACTION_TAG_PER_HOUR,
      }
    }
  }

  return { exceeded: false }
}

// ============================================================================
// [SECURITY] Input Filtering (Prompt Injection Detection)
// ============================================================================

// [SECURITY] Patterns to detect common prompt injection and jailbreak attempts
const BLOCKED_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /ignore\s+(all\s+)?above/i,
  /disregard\s+(all\s+)?previous/i,
  /forget\s+(all\s+)?(your|previous)\s+instructions/i,
  /you\s+are\s+now\s+(a|an|in)\s+/i,
  /pretend\s+(to\s+be|you\s+are)/i,
  /act\s+as\s+(a|an|if)/i,
  /enter\s+(developer|debug|admin|god)\s+mode/i,
  /system\s*prompt/i,
  /\bDAN\b/,
  /jailbreak/i,
  /what\s+are\s+your\s+(instructions|rules|directives|system\s+prompt)/i,
  /repeat\s+(everything|all|your)\s+(above|instructions|prompt)/i,
  /translate\s+your\s+(instructions|prompt|rules)/i,
  /base64/i,
]

// [SECURITY] Check message for injection patterns
function checkForInjectionPatterns(message) {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(message)) {
      return { blocked: true, pattern: pattern.source }
    }
  }
  return { blocked: false }
}

// [SECURITY] Canned response for blocked injection attempts
const BLOCKED_INJECTION_RESPONSE = "I'm Ember, the ForgingApps assistant. I'm here to help with our services and booking consultations. What can I help you with?"

// ============================================================================
// [SECURITY] Output Filtering (Sensitive Information Leakage Detection)
// ============================================================================

// [SECURITY] Terms that indicate sensitive/internal information leakage
const SENSITIVE_TERMS = [
  'OpenClaw',
  'openclaw',
  'Hydra',
  'hydra-dominatus',
  'alpharius',
  'gene-seed',
  'MiniMax',
  'minimax',
  'cardinal-ember-sentinel',
  '/home/',
  '/opt/',
  'docker exec',
  '.openclaw',
  'gateway.env',
  'RESEND_API_KEY',
  'ember-local-token',
  'wardrobe-e2e-local-token',
]

// [SECURITY] Check reply for sensitive information leakage
function checkForSensitiveLeakage(reply) {
  const replyLower = reply.toLowerCase()
  for (const term of SENSITIVE_TERMS) {
    const termLower = term.toLowerCase()
    if (replyLower.includes(termLower)) {
      return { leaked: true, term }
    }
  }
  return { leaked: false }
}

// [SECURITY] Canned response for leaked information
const BLOCKED_LEAK_RESPONSE = "I'd be happy to help with questions about ForgingApps services. What would you like to know?"

// ============================================================================
// Original Functions (Unchanged)
// ============================================================================

function sendJson(res, statusCode, payload, origin = '*') {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'Content-Type, X-Synthetic-Warmup',
    'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
    'Cache-Control': 'no-store',
  }
  if (origin !== '*') {
    headers['Access-Control-Allow-Credentials'] = 'true'
  }
  res.writeHead(statusCode, headers)
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

  // [SECURITY] Check action tag rate limit
  const actionTagLimitCheck = checkActionTagRateLimit(visitorId)
  if (actionTagLimitCheck.exceeded) {
    console.log(`[ember-chat-proxy] [SECURITY] Action tag rate limit exceeded for ${visitorId}; max ${actionTagLimitCheck.limit} per hour`)
    // Skip all action tags this time
    return []
  }

  for (const tag of tags) {
    if (tag.type === 'COLLECT_EMAIL') {
      // [SECURITY] COLLECT_EMAIL only when session has no email yet
      if (session.email) {
        console.log(`[ember-chat-proxy] [SECURITY] Skipped COLLECT_EMAIL tag: visitor ${visitorId} already has email`)
        actions.push({ type: 'collect_email', status: 'skipped', reason: 'email_already_set' })
        continue
      }
      actions.push({ type: 'collect_email' })
      continue
    }

    if (tag.type === 'INTERNAL_NOTIFY') {
      if (!session.email) {
        console.log(`[ember-chat-proxy] [SECURITY] Skipped INTERNAL_NOTIFY tag: visitor ${visitorId} has no email`)
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
      // [SECURITY] SEND_SUMMARY only when session HAS an email
      if (!targetEmail || !isValidEmail(targetEmail)) {
        console.log(`[ember-chat-proxy] [SECURITY] Skipped SEND_SUMMARY tag: visitor ${visitorId} has no valid email`)
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
      // [SECURITY] MEETING_CONFIRMATION only when session HAS an email
      if (!targetEmail || !isValidEmail(targetEmail)) {
        console.log(`[ember-chat-proxy] [SECURITY] Skipped MEETING_CONFIRMATION tag: visitor ${visitorId} has no valid email`)
        actions.push({ type: 'meeting_confirmation', status: 'skipped', reason: 'missing_email' })
        continue
      }
      const result = await sendMeetingConfirmation(session.name, targetEmail, {
        topic: 'Discovery call',
      })
      actions.push({ type: 'meeting_confirmation', status: result.ok ? 'sent' : result.skipped ? 'skipped' : 'failed', email: targetEmail })
      continue
    }

    // [SECURITY] Log and skip any unrecognized tags
    console.log(`[ember-chat-proxy] [SECURITY] Skipped unrecognized action tag: ${tag.type}`)
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
      message: 'Thanks! Got it. We can follow up by email from here.',
    },
  }
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin
  const allowedOrigin = getAllowedOrigin(origin)

  if (origin && !isAllowedOrigin(origin)) {
    sendJson(res, 403, { error: 'Origin not allowed' }, allowedOrigin)
    return
  }

  if (req.method === 'OPTIONS') {
    const headers = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Headers': 'Content-Type, X-Synthetic-Warmup',
      'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
      'Cache-Control': 'no-store',
    }
    if (allowedOrigin !== '*') {
      headers['Access-Control-Allow-Credentials'] = 'true'
    }
    res.writeHead(204, headers)
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
      const syntheticWarmup = String(req.headers['x-synthetic-warmup'] || '').trim().toLowerCase() === '1'

      if (!message || !visitorId) {
        sendJson(res, 400, { error: 'message and visitorId are required' }, allowedOrigin)
        return
      }

      // [SECURITY] Check message length cap
      if (message.length > MESSAGE_MAX_LENGTH) {
        sendJson(res, 400, {
          error: `Message exceeds maximum length of ${MESSAGE_MAX_LENGTH} characters`,
          length: message.length,
        }, allowedOrigin)
        return
      }

      // [SECURITY] Check rate limit (messages per minute/hour). Synthetic warmups are isolated
      // and should keep the model path hot without consuming visitor-facing quota.
      const rateLimitCheck = syntheticWarmup ? { exceeded: false } : checkRateLimit(visitorId)
      if (rateLimitCheck.exceeded) {
        console.log(`[ember-chat-proxy] [SECURITY] Rate limit exceeded for ${visitorId}: ${rateLimitCheck.window} limit (${rateLimitCheck.limit})`)
        sendJson(res, 429, {
          error: `Rate limit exceeded. Max ${rateLimitCheck.limit} messages per ${rateLimitCheck.window}. Please try again later.`,
          retryAfter: rateLimitCheck.window === 'minute' ? 60 : 3600,
        }, allowedOrigin)
        return
      }

      // [SECURITY] Check for prompt injection patterns in message
      const injectionCheck = checkForInjectionPatterns(message)
      if (injectionCheck.blocked) {
        console.log(`[ember-chat-proxy] [SECURITY] Blocked injection attempt for ${visitorId}; matched pattern: ${injectionCheck.pattern}`)
        if (!syntheticWarmup) {
          addHistory(visitorId, 'user', message)
          addHistory(visitorId, 'assistant', BLOCKED_INJECTION_RESPONSE)
        }
        sendJson(res, 200, {
          reply: BLOCKED_INJECTION_RESPONSE,
          actions: [],
          synthetic_warmup: syntheticWarmup,
          _securityNote: 'blocked_injection_attempt',
        }, allowedOrigin)
        return
      }

      if (!syntheticWarmup) addHistory(visitorId, 'user', message)
      const rawReply = await askBot(visitorId, message)

      // [SECURITY] Check for sensitive information leakage in bot reply
      const leakageCheck = checkForSensitiveLeakage(rawReply)
      let finalReply = rawReply
      if (leakageCheck.leaked) {
        console.log(`[ember-chat-proxy] [SECURITY] Detected sensitive information leakage for ${visitorId}; blocked term: ${leakageCheck.term}`)
        finalReply = BLOCKED_LEAK_RESPONSE
      }

      const { cleanReply, tags } = parseActionTags(finalReply)
      const effectiveTags = syntheticWarmup ? [] : inferFallbackTags(visitorId, cleanReply, tags)
      const actions = syntheticWarmup ? [] : await executeActionTags(visitorId, effectiveTags)
      const reply = cleanReply || 'I can help with that. Tell me a bit more.'
      if (!syntheticWarmup) addHistory(visitorId, 'assistant', reply)
      sendJson(res, 200, { reply, actions, synthetic_warmup: syntheticWarmup }, allowedOrigin)
      return
    }

    if (req.method === 'POST' && url.pathname === '/api/ember/collect-email') {
      const body = await parseBody(req)
      const result = await handleCollectEmail(body)
      sendJson(res, result.status, result.payload, allowedOrigin)
      return
    }

    const proxyTarget = getProxyTarget(url.pathname, url.search || '')
    if (proxyTarget) {
      const body = req.method === 'POST' || req.method === 'PUT' ? await parseBody(req) : null
      const downstream = http.request(
        {
          hostname: proxyTarget.hostname,
          port: proxyTarget.port,
          path: proxyTarget.path,
          method: req.method,
          headers: buildProxyHeaders(req.headers),
        },
        (proxyRes) => {
          let data = ''
          proxyRes.on('data', (chunk) => { data += chunk })
          proxyRes.on('end', () => {
            const headers = {
              'Content-Type': proxyRes.headers['content-type'] || proxyTarget.contentType,
              'Access-Control-Allow-Origin': allowedOrigin,
              'Access-Control-Allow-Headers': 'Content-Type, X-Synthetic-Warmup',
              'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
              'Cache-Control': 'no-store',
            }
            if (allowedOrigin !== '*') {
              headers['Access-Control-Allow-Credentials'] = 'true'
            }
            res.writeHead(proxyRes.statusCode || 502, headers)
            res.end(data)
          })
        },
      )
      downstream.on('error', (err) => {
        console.error('[ember-chat-proxy] proxy error:', err.message)
        sendJson(res, 502, { error: 'Upstream unavailable: ' + err.message }, allowedOrigin)
      })
      if (body !== null) {
        downstream.write(JSON.stringify(body))
      }
      downstream.end()
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
