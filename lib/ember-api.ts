import { getEmberCollectEmailUrl, getEmberProxyUrl, type EmberAction } from '@/lib/ember-config'

interface SendEmberMessageInput {
  message: string
  visitorId: string
}

interface CollectEmberEmailInput {
  visitorId: string
  email: string
  name?: string
}

interface SendEmberMessageResult {
  reply: string
  actions: EmberAction[]
}

interface CollectEmberEmailResult {
  ok: boolean
  email?: string
  message?: string
  actions: EmberAction[]
}

export async function sendEmberMessage({ message, visitorId }: SendEmberMessageInput): Promise<SendEmberMessageResult> {
  const response = await fetch(getEmberProxyUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      visitorId,
      stream: false,
    }),
  })

  if (!response.ok) {
    throw new Error(`Ember proxy request failed: ${response.status}`)
  }

  const data = await response.json()
  return {
    reply: typeof data.reply === 'string' ? data.reply : '',
    actions: Array.isArray(data.actions) ? data.actions : [],
  }
}

export async function collectEmberEmail({ visitorId, email, name }: CollectEmberEmailInput): Promise<CollectEmberEmailResult> {
  const response = await fetch(getEmberCollectEmailUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ visitorId, email, name }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(typeof data.error === 'string' ? data.error : `Collect email request failed: ${response.status}`)
  }

  return {
    ok: Boolean(data.ok),
    email: typeof data.email === 'string' ? data.email : undefined,
    message: typeof data.message === 'string' ? data.message : undefined,
    actions: Array.isArray(data.actions) ? data.actions : [],
  }
}
