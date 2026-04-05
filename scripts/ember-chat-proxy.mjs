import http from 'node:http'

const PORT = Number(process.env.PORT || 18893)
const GATEWAY_URL = process.env.EMBER_GATEWAY_URL || 'http://127.0.0.1:18892/v1/messages'
const AUTH_TOKEN = process.env.EMBER_GATEWAY_TOKEN || 'ember-local-token'
const ORIGIN_ALLOWLIST = new Set([
  'https://forgingapps.com',
  'https://www.forgingapps.com',
  'https://forgingapps.pages.dev',
  'http://localhost:3000',
  'http://localhost:3001',
])

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
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', reject)
  })
}

function sanitizeVisitorId(value) {
  return String(value || '')
    .trim()
    .replace(/[^a-zA-Z0-9:_-]/g, '-')
    .slice(0, 120)
}

async function forwardMessage({ message, visitorId, stream = false }) {
  const response = await fetch(GATEWAY_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: stream ? 'text/event-stream' : 'application/json',
    },
    body: JSON.stringify({
      visitorId,
      message: {
        role: 'user',
        content: message,
      },
      stream,
    }),
  })

  if (!response.ok) {
    throw new Error(`Gateway request failed: ${response.status}`)
  }

  return response
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

  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`)

  try {
    if (req.method === 'GET' && url.pathname === '/health') {
      sendJson(res, 200, { ok: true, service: 'ember-chat-proxy', gateway: GATEWAY_URL }, allowedOrigin)
      return
    }

    if (req.method === 'POST' && url.pathname === '/api/ember/message') {
      const body = await parseBody(req)
      const message = String(body?.message || '').trim()
      const visitorId = sanitizeVisitorId(body?.visitorId)
      const stream = Boolean(body?.stream)

      if (!message || !visitorId) {
        sendJson(res, 400, { error: 'message and visitorId are required' }, allowedOrigin)
        return
      }

      const gatewayResponse = await forwardMessage({ message, visitorId, stream })

      if (stream) {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST,OPTIONS,GET',
          'Cache-Control': 'no-store',
          Connection: 'keep-alive',
        })

        if (!gatewayResponse.body) {
          res.end()
          return
        }

        for await (const chunk of gatewayResponse.body) {
          res.write(chunk)
        }
        res.end()
        return
      }

      const data = await gatewayResponse.json()
      const reply = typeof data?.reply === 'string'
        ? data.reply
        : typeof data?.content === 'string'
          ? data.content
          : typeof data?.message?.content === 'string'
            ? data.message.content
            : ''

      sendJson(res, 200, { reply }, allowedOrigin)
      return
    }

    sendJson(res, 404, { error: 'Not found' }, allowedOrigin)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    sendJson(res, 500, { error: message }, allowedOrigin)
  }
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[ember-chat-proxy] listening on http://127.0.0.1:${PORT}`)
  console.log(`[ember-chat-proxy] forwarding to ${GATEWAY_URL}`)
})
