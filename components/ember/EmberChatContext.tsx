'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { sendEmberMessage } from '@/lib/ember-api'
import {
  createWelcomeMessage,
  EMBER_ERROR_MESSAGE,
  EMBER_STORAGE_KEYS,
  type EmberMessage,
} from '@/lib/ember-config'

interface EmberChatContextValue {
  isOpen: boolean
  loading: boolean
  messages: EmberMessage[]
  error: string
  hasConversation: boolean
  open: () => void
  close: () => void
  toggle: () => void
  resetConversation: () => void
  sendMessage: (message: string) => Promise<void>
}

const EmberChatContext = createContext<EmberChatContextValue | null>(null)

function getOrCreateVisitorId() {
  const existing = window.localStorage.getItem(EMBER_STORAGE_KEYS.visitorId)
  if (existing) return existing

  const created = `ember_${crypto.randomUUID()}`
  window.localStorage.setItem(EMBER_STORAGE_KEYS.visitorId, created)
  return created
}

export function EmberChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<EmberMessage[]>([createWelcomeMessage()])
  const [error, setError] = useState('')
  const [visitorId, setVisitorId] = useState('ember_ssr')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const storedMessages = window.localStorage.getItem(EMBER_STORAGE_KEYS.messages)
    const storedOpen = window.localStorage.getItem(EMBER_STORAGE_KEYS.open)
    const parsedMessages = storedMessages ? JSON.parse(storedMessages) as EmberMessage[] : null

    setMessages(parsedMessages?.length ? parsedMessages : [createWelcomeMessage()])
    setIsOpen(storedOpen === 'true')
    setVisitorId(getOrCreateVisitorId())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(EMBER_STORAGE_KEYS.messages, JSON.stringify(messages))
  }, [messages, hydrated])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(EMBER_STORAGE_KEYS.open, String(isOpen))
  }, [isOpen, hydrated])

  async function sendMessage(message: string) {
    const trimmed = message.trim()
    if (!trimmed || loading) return

    const userMessage: EmberMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: trimmed,
    }

    setError('')
    setLoading(true)
    setMessages((prev) => [...prev, userMessage])
    setIsOpen(true)

    try {
      const { reply } = await sendEmberMessage({ message: trimmed, visitorId })
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: reply || EMBER_ERROR_MESSAGE,
        },
      ])
    } catch {
      setError(EMBER_ERROR_MESSAGE)
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_error_${Date.now()}`,
          role: 'assistant',
          content: EMBER_ERROR_MESSAGE,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function resetConversation() {
    setError('')
    setLoading(false)
    setMessages([createWelcomeMessage()])
    const created = `ember_${crypto.randomUUID()}`
    window.localStorage.setItem(EMBER_STORAGE_KEYS.visitorId, created)
    setVisitorId(created)
  }

  const value = useMemo<EmberChatContextValue>(() => ({
    isOpen,
    loading,
    messages,
    error,
    hasConversation: messages.some((message) => message.role === 'user'),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
    resetConversation,
    sendMessage,
  }), [isOpen, loading, messages, error])

  return <EmberChatContext.Provider value={value}>{children}</EmberChatContext.Provider>
}

export function useEmberChat() {
  const context = useContext(EmberChatContext)
  if (!context) {
    throw new Error('useEmberChat must be used within EmberChatProvider')
  }
  return context
}
