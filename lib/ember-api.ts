import { getEmberProxyUrl } from '@/lib/ember-config'

interface SendEmberMessageInput {
  message: string
  visitorId: string
}

interface SendEmberMessageResult {
  reply: string
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
  }
}
