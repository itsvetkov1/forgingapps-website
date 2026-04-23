'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp, RotateCcw, X } from 'lucide-react'
import EmberFlameIcon from '@/components/ember/EmberFlameIcon'
import EmberMessageBubble from '@/components/ember/EmberMessageBubble'
import EmberStarterPrompts from '@/components/ember/EmberStarterPrompts'
import EmberTypingIndicator from '@/components/ember/EmberTypingIndicator'
import { useEmberChat } from '@/components/ember/EmberChatContext'

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return []

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true')
}

export default function EmberChatWindow() {
  const {
    awaitingEmail,
    close,
    error,
    hasConversation,
    loading,
    messages,
    resetConversation,
    sendMessage,
    submitEmail,
  } = useEmberChat()
  const [input, setInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    inputRef.current?.focus()

    return () => {
      previousFocusRef.current?.focus()
    }
  }, [])

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, loading, awaitingEmail])

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements(panelRef.current)
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (!firstElement || !lastElement) return
      const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
        return
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [close])

  async function handleSend(message: string) {
    const trimmed = message.trim()
    if (!trimmed) return
    setInput('')
    await sendMessage(trimmed)
  }

  async function handleEmailSubmit() {
    const trimmed = emailInput.trim()
    if (!trimmed) return
    await submitEmail(trimmed)
    setEmailInput('')
  }

  return (
    <div
      ref={panelRef}
      data-test="ember-chat-widget-panel"
      className="pointer-events-auto fixed bottom-0 left-0 right-0 z-[9999] mx-auto flex max-h-[70vh] flex-col overflow-hidden rounded-t-2xl border border-zinc-700 bg-zinc-900 shadow-2xl md:bottom-6 md:left-auto md:right-6 md:h-[550px] md:max-h-none md:w-[400px] md:rounded-2xl ember-chat-enter"
      role="dialog"
      aria-label="Chat with Ember"
      aria-modal="true"
    >
      <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <EmberFlameIcon small />
          <div>
            <p className="font-cinzel text-lg font-bold text-white">Ember</p>
            <p className="text-xs text-zinc-400">Live AI assistant — built by us</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetConversation}
            className="rounded-lg border border-zinc-600 p-2 text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
            aria-label="Start a new conversation"
            title="New conversation"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={close}
            className="rounded-lg border border-zinc-600 p-2 text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <EmberMessageBubble key={message.id} message={message} />
        ))}

        {!hasConversation && <EmberStarterPrompts disabled={loading} onSelect={(prompt) => void handleSend(prompt)} />}

        {awaitingEmail ? (
          <div className="rounded-2xl border border-amber-500/30 bg-zinc-800 p-4">
            <p className="mb-3 text-sm text-zinc-200">Drop your email here and Ember will keep the conversation moving there.</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(event) => setEmailInput(event.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white outline-none transition focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => void handleEmailSubmit()}
                disabled={loading || !emailInput.trim()}
                className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Share
              </button>
            </div>
          </div>
        ) : null}

        {loading && <EmberTypingIndicator />}
      </div>

      <div className="border-t border-zinc-700 bg-zinc-800 p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            void handleSend(input)
          }}
          className="space-y-3"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void handleSend(input)
              }
            }}
            rows={3}
            placeholder="Ask about our services, pricing, demos, or booking a call..."
            disabled={loading}
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500 disabled:opacity-70"
          />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">Enter sends. Shift+Enter adds a newline.</p>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-orange-600/25 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              <ArrowUp size={18} />
            </button>
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
        </form>
      </div>
      <style jsx global>{`
        @keyframes ember-chat-enter {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .ember-chat-enter {
          animation: ember-chat-enter 180ms ease-out;
        }
      `}</style>
    </div>
  )
}
