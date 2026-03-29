'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const STARTER_PROMPTS = [
  'How long does EU shipping take?',
  'Can I return an item if it does not fit?',
  'Do you allow size exchanges?',
  'I am between two sizes. What do you recommend?',
]

function getOrCreateVisitorId() {
  const key = 'veloura-demo-visitor-id'
  const existing = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
  if (existing) return existing

  const created = `visitor_${crypto.randomUUID()}`
  window.localStorage.setItem(key, created)
  return created
}

export default function VelouraChatEmbed() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi. I am Veloura Support. Ask me about shipping, returns, exchanges, or sizing.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)
  const visitorId = useMemo(() => (typeof window !== 'undefined' ? getOrCreateVisitorId() : 'visitor_ssr'), [])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading])

  async function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    setError('')
    setLoading(true)

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: trimmed,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const response = await fetch('https://chat.forgingapps.com/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId,
          message: trimmed,
        }),
      })

      if (!response.ok) {
        throw new Error(`Chat request failed: ${response.status}`)
      }

      const data = await response.json()
      const reply = typeof data.reply === 'string' ? data.reply.trim() : ''

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          text: reply || 'Sorry. I could not produce a reply right now.',
        },
      ])
    } catch (_error) {
      setError('The demo chat is temporarily unavailable. Please try again in a moment.')
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_error_${Date.now()}`,
          role: 'assistant',
          text: 'The demo chat is temporarily unavailable. Please try again in a moment.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function resetChat() {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: 'Chat reset. Ask me about shipping, returns, exchanges, or sizing.',
      },
    ])
    setInput('')
    setError('')
  }

  return (
    <div className="bg-forge-stone border border-forge-ember/30 rounded-lg overflow-hidden">
      <div className="border-b border-forge-ember/20 px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-cinzel text-2xl font-bold text-forge-gold">Live Veloura Support Demo</h2>
          <p className="text-sm text-gray-400">Embedded customer support chat powered by the wardrobe-support bot.</p>
        </div>
        <button type="button" onClick={resetChat} className="btn-secondary text-sm px-4 py-2">
          Reset chat
        </button>
      </div>

      <div className="px-6 pt-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(prompt)}
              disabled={loading}
              className="text-sm border border-forge-ember/30 text-forge-gold hover:bg-forge-dark rounded-full px-4 py-2 transition disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="h-[480px] overflow-y-auto px-6 pb-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === 'user'
                  ? 'bg-forge-ember text-white'
                  : 'bg-forge-dark border border-forge-ember/20 text-gray-200'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 bg-forge-dark border border-forge-ember/20 text-gray-400">
              Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-forge-ember/20 p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void sendMessage(input)
          }}
          className="space-y-3"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void sendMessage(input)
              }
            }}
            placeholder="Ask about shipping, returns, exchanges, or sizing..."
            rows={3}
            disabled={loading}
            className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-3 text-white focus:outline-none focus:border-forge-gold transition resize-none"
          />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              Demo only. No real orders, tracking, refunds, or personal account actions.
            </p>
            <button type="submit" disabled={loading || !input.trim()} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              Send
            </button>
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
        </form>
      </div>
    </div>
  )
}
