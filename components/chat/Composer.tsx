'use client'

import { useRef } from 'react'
import { ArrowUp, LoaderCircle } from 'lucide-react'
import type { CompletionStatus } from '@/lib/chat-intake'

interface ComposerProps {
  completion: CompletionStatus
  copy: {
    hint: string
    placeholder: string
    send: string
    summary: {
      idle: string
      ready: string
      sending: string
      sent: string
    }
  }
  disabled?: boolean
  finalizePending?: boolean
  finalizeSent?: boolean
  onFinalize: () => void | Promise<void>
  onSend: (message: string) => void | Promise<void>
  toast: { tone: 'success' | 'error'; message: string } | null
}

export default function Composer({
  completion,
  copy,
  disabled,
  finalizePending,
  finalizeSent,
  onFinalize,
  onSend,
  toast,
}: ComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const resize = () => {
    const element = textareaRef.current
    if (!element) return
    element.style.height = '0px'
    element.style.height = `${Math.min(element.scrollHeight, 140)}px`
  }

  const handleSend = () => {
    const value = textareaRef.current?.value ?? ''
    if (!value.trim() || disabled) return
    void onSend(value.trim())
    if (textareaRef.current) {
      textareaRef.current.value = ''
      textareaRef.current.style.height = '0px'
      textareaRef.current.style.height = '56px'
    }
  }

  const finalizeDisabled = completion !== 'ready' || Boolean(finalizePending) || Boolean(finalizeSent)
  const finalizeLabel = finalizePending
    ? copy.summary.sending
    : finalizeSent
      ? copy.summary.sent
      : completion === 'ready'
        ? copy.summary.ready
        : copy.summary.idle

  return (
    <div className="border-t border-[#e8d7ba]/12 px-4 py-4 min-[840px]:px-6">
      {toast ? (
        <div
          data-test="brief-received-summary-toast"
          className={`mb-3 rounded-2xl border px-4 py-3 text-sm leading-6 ${toast.tone === 'success' ? 'border-[#d8660b]/45 bg-[#2b241b] text-[#f8f0e3]' : 'border-[#d8660b]/35 bg-[#2a1f17] text-[#ffd8bc]'}`}
        >
          {toast.message}
        </div>
      ) : null}
      <div className="rounded-[24px] border border-[#e8d7ba]/16 bg-[#18212b] px-3 py-3 shadow-[0_16px_45px_rgba(0,0,0,0.24)] focus-within:border-[#d8660b]/55">
        <textarea
          ref={textareaRef}
          rows={2}
          data-test="brief-received-chat-input"
          disabled={disabled}
          placeholder={copy.placeholder}
          className="min-h-[56px] w-full resize-none bg-transparent px-2 py-2 text-sm leading-6 text-[#f8f0e3] outline-none placeholder:text-[#b8a992] disabled:cursor-not-allowed disabled:text-[#8a8177]"
          onInput={resize}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              handleSend()
            }
          }}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2">
          <p className="text-xs text-[#b8a992]">{copy.hint}</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-test="brief-received-send-summary-btn"
              onClick={() => void onFinalize()}
              disabled={finalizeDisabled}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition ${finalizeDisabled ? 'border-[#e8d7ba]/14 bg-[#151d26] text-[#8a8177]' : 'border-[#f0b37e]/40 bg-[#d8660b] text-white shadow-[0_16px_38px_rgba(216,102,11,0.28)] hover:bg-[#e8852f]'}`}
            >
              {finalizePending ? <LoaderCircle size={16} className="animate-spin" /> : null}
              <span>{finalizeLabel}</span>
            </button>
            <button
              type="button"
              data-test="brief-received-chat-send"
              onClick={handleSend}
              disabled={disabled}
              aria-label={copy.send}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d8660b] text-white shadow-[0_16px_38px_rgba(216,102,11,0.34)] transition hover:bg-[#e8852f] disabled:cursor-not-allowed disabled:bg-[#3a342d] disabled:text-[#8a8177]"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
