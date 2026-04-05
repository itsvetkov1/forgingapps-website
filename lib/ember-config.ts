export type EmberRole = 'user' | 'assistant'
export type EmberActionType = 'collect_email' | 'internal_notify' | 'send_summary' | 'meeting_confirmation'

export interface EmberMessage {
  id: string
  role: EmberRole
  content: string
}

export interface EmberAction {
  type: EmberActionType
  status?: 'sent' | 'skipped' | 'failed'
  reason?: string
  email?: string
}

export const EMBER_STORAGE_KEYS = {
  visitorId: 'ember-chat-visitor-id',
  messages: 'ember-chat-messages',
  open: 'ember-chat-open',
} as const

export const EMBER_WELCOME_MESSAGE = "Hey! I'm Ember, the ForgingApps assistant. I can tell you about our services, show you what we've built, or help you book a call with the team. What brings you here?"

export const EMBER_ERROR_MESSAGE = 'Something went wrong. Please try again.'

export const EMBER_STARTER_PROMPTS = [
  'What services do you offer?',
  'How much does an app cost?',
  'Show me the AI demo',
  'I want to book a call',
] as const

export function createWelcomeMessage(): EmberMessage {
  return {
    id: 'ember-welcome',
    role: 'assistant',
    content: EMBER_WELCOME_MESSAGE,
  }
}

function getBaseEmberProxyOrigin() {
  if (typeof window === 'undefined') return 'https://chat.forgingapps.com'

  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'http://127.0.0.1:18893'
  }

  return 'https://chat.forgingapps.com'
}

export function getEmberProxyUrl() {
  return `${getBaseEmberProxyOrigin()}/api/ember/message`
}

export function getEmberCollectEmailUrl() {
  return `${getBaseEmberProxyOrigin()}/api/ember/collect-email`
}
