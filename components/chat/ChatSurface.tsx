'use client'

import { useMemo } from 'react'
import ChatHeader from '@/components/chat/ChatHeader'
import Composer from '@/components/chat/Composer'
import MessageList from '@/components/chat/MessageList'
import StarterPrompts from '@/components/chat/StarterPrompts'
import SubmitCTA from '@/components/chat/SubmitCTA'
import TypingDots from '@/components/chat/TypingDots'
import type { BriefRecord, ChatMessageRecord, IntakeSessionState } from '@/lib/chat-intake'

interface ChatSurfaceProps {
  announcement: string
  brief: BriefRecord | null
  chatError: string | null
  copy: any
  messages: ChatMessageRecord[]
  onSelectStarterPrompt: (prompt: string) => void | Promise<void>
  onSendMessage: (message: string) => void | Promise<void>
  onSubmitBrief: () => void | Promise<void>
  phase: 'idle' | 'loading' | 'ready' | 'missing' | 'error'
  sessionState: IntakeSessionState
  starterPrompts: string[]
  submitting: boolean
  typing: boolean
}

export default function ChatSurface({
  announcement,
  brief,
  chatError,
  copy,
  messages,
  onSelectStarterPrompt,
  onSendMessage,
  onSubmitBrief,
  phase,
  sessionState,
  starterPrompts,
  submitting,
  typing,
}: ChatSurfaceProps) {
  const placeholderMessage = useMemo<ChatMessageRecord[]>(() => {
    if (phase === 'loading') {
      return [{ id: 'loading', role: 'assistant', content: copy.chat.loading }]
    }

    if (phase === 'missing') {
      return [{ id: 'missing', role: 'assistant', content: copy.chat.missingBrief }]
    }

    if (phase === 'error') {
      return [{ id: 'error', role: 'assistant', content: copy.chat.invalidBrief }]
    }

    return messages
  }, [copy.chat.invalidBrief, copy.chat.loading, copy.chat.missingBrief, messages, phase])

  const showStarters = phase === 'ready' && messages.length <= 1 && sessionState !== 'submitted'
  const showSubmit = sessionState === 'minimum_met' || sessionState === 'ready_to_submit' || submitting
  const disableComposer = phase !== 'ready' || sessionState === 'submitted' || submitting

  return (
    <section data-test="brief-received-chat-panel" className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-[32px] border border-[#d7cdb8] bg-[#fffaf3] shadow-[0_30px_80px_rgba(15,20,25,0.08)]">
      <ChatHeader copy={copy.chat.header} />
      <div className="sr-only" aria-live="polite">{announcement}</div>
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden px-4 py-4 min-[840px]:px-6">
        <MessageList messages={placeholderMessage} />
        {typing ? <TypingDots label={copy.chat.typingLabel} /> : null}
        {showStarters ? <StarterPrompts prompts={starterPrompts} onSelect={onSelectStarterPrompt} /> : null}
        {showSubmit ? (
          <SubmitCTA
            copy={copy.chat.submit}
            disabled={submitting || sessionState === 'submitted'}
            loading={submitting}
            onSubmit={onSubmitBrief}
          />
        ) : null}
        {chatError ? <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{chatError}</p> : null}
      </div>
      <div className="sticky bottom-0 bg-[#fffaf3]">
        <Composer
          copy={copy.chat.composer}
          disabled={disableComposer}
          onSend={onSendMessage}
          submitted={sessionState === 'submitted'}
        />
      </div>
    </section>
  )
}
