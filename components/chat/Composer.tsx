'use client'

import { useRef } from 'react'
import { ArrowUp } from 'lucide-react'

interface ComposerProps {
  copy: {
    hint: string
    placeholder: string
    send: string
    submitted: string
  }
  disabled?: boolean
  onSend: (message: string) => void | Promise<void>
  submitted?: boolean
}

export default function Composer({ copy, disabled, onSend, submitted }: ComposerProps) {
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

  return (
    <div className="border-t border-[#eadfca] px-4 py-4 min-[840px]:px-6">
      <div className="rounded-[24px] border border-[#d7cdb8] bg-white px-3 py-3 shadow-[0_16px_45px_rgba(15,20,25,0.06)] focus-within:border-[#d8660b]/55">
        <textarea
          ref={textareaRef}
          rows={2}
          disabled={disabled}
          placeholder={submitted ? copy.submitted : copy.placeholder}
          className="min-h-[56px] w-full resize-none bg-transparent px-2 py-2 text-sm leading-6 text-[#141a22] outline-none placeholder:text-[#8a8177] disabled:cursor-not-allowed disabled:text-[#8a8177]"
          onInput={resize}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              handleSend()
            }
          }}
        />
        <div className="mt-3 flex items-center justify-between gap-4 px-2">
          <p className="text-xs text-[#8a8177]">{copy.hint}</p>
          <button
            type="button"
            onClick={handleSend}
            disabled={disabled}
            aria-label={copy.send}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d8660b] text-white shadow-[0_16px_38px_rgba(216,102,11,0.34)] transition hover:bg-[#e8852f] disabled:cursor-not-allowed disabled:bg-[#d7cdb8] disabled:text-[#8a8177]"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
