'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { parseChatText, parseProductLine, splitChatBlocks } from '@/lib/chat-format.mjs'
import { getProductActionPrompts } from '@/lib/product-actions.mjs'
import {
  CHAT_SUBTITLE,
  INPUT_PLACEHOLDER,
  RESET_MESSAGE,
  STARTER_PROMPTS,
  WELCOME_MESSAGE,
} from '@/lib/veloura-demo-config.mjs'
import { getVelouraProxyUrl } from '@/lib/veloura-config'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

function getOrCreateVisitorId() {
  const key = 'veloura-demo-visitor-id'
  const existing = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
  if (existing) return existing

  const created = `visitor_${(typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36))}`
  window.localStorage.setItem(key, created)
  return created
}

export default function VelouraChatEmbed() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: WELCOME_MESSAGE,
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
      const response = await fetch(getVelouraProxyUrl(), {
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
        text: RESET_MESSAGE,
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
          <p className="text-sm text-gray-400">{CHAT_SUBTITLE}</p>
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
        {messages.map((message) => {
          const blocks = splitChatBlocks(message.text)

          return (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === 'user'
                    ? 'bg-forge-ember text-white'
                    : 'bg-forge-dark border border-forge-ember/20 text-gray-200'
                }`}
              >
                <div className="space-y-3">
                  {blocks.map((block, blockIndex) => {
                    const product = parseProductLine(block.text)

                    if (product && message.role === 'assistant') {
                      const actionPrompts = getProductActionPrompts(product.name)

                      return (
                        <div
                          key={`${message.id}-block-${blockIndex}`}
                          className="rounded-2xl border border-forge-gold/30 bg-black/15 px-4 py-3 shadow-[0_0_0_1px_rgba(255,184,77,0.04)]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-[0.22em] text-forge-gold/80">Product {product.index}</p>
                              <h4 className="text-base font-semibold text-white">{product.name}</h4>
                            </div>
                            <div className="text-right">
                              {product.previousPrice && (
                                <p className="text-xs text-gray-500 line-through">{product.previousPrice}</p>
                              )}
                              <p className="text-lg font-semibold text-forge-gold">{product.currentPrice}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-3">
                            <span className="inline-flex rounded-full border border-forge-ember/20 px-3 py-1 text-xs text-gray-300">
                              {product.onSale ? 'Sale item' : 'Current catalog item'}
                            </span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {actionPrompts.map((action) => (
                              <button
                                key={`${product.name}-${action.label}`}
                                type="button"
                                onClick={() => void sendMessage(action.prompt)}
                                disabled={loading}
                                className="rounded-full border border-forge-ember/30 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-forge-ember/20 disabled:opacity-50"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={`${message.id}-block-${blockIndex}`}
                        className={block.type === 'list-item' ? 'rounded-xl border border-forge-ember/15 bg-black/10 px-3 py-2' : ''}
                      >
                        {parseChatText(block.text).map((line, lineIndex) => (
                          <Fragment key={`${message.id}-line-${blockIndex}-${lineIndex}`}>
                            {line?.map((segment, segmentIndex) =>
                              segment.bold ? (
                                <strong key={`${message.id}-segment-${blockIndex}-${lineIndex}-${segmentIndex}`} className="font-semibold text-white">
                                  {segment.text}
                                </strong>
                              ) : (
                                <span key={`${message.id}-segment-${blockIndex}-${lineIndex}-${segmentIndex}`}>{segment.text}</span>
                              )
                            )}
                            {lineIndex < parseChatText(block.text).length - 1 && <br />}
                          </Fragment>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

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
            placeholder={INPUT_PLACEHOLDER}
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
