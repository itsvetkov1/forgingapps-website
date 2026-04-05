export type EmberRole = 'user' | 'assistant'

export interface EmberMessage {
  id: string
  role: EmberRole
  content: string
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

export function getEmberProxyUrl() {
  if (typeof window === 'undefined') return 'https://chat.forgingapps.com/api/ember/message'

  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') {
    return 'http://127.0.0.1:18893/api/ember/message'
  }

  return 'https://chat.forgingapps.com/api/ember/message'
}
