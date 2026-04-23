'use client'

import { useMemo } from 'react'
import ChatHeader from '@/components/chat/ChatHeader'
import Composer from '@/components/chat/Composer'
import MessageList from '@/components/chat/MessageList'
import StarterPrompts from '@/components/chat/StarterPrompts'
import TypingDots from '@/components/chat/TypingDots'
import type { BriefRecord, ChatMessageRecord, CompletionStatus } from '@/lib/chat-intake'

interface ChatSurfaceProps {
  brief: BriefRecord | null
  chatError: string | null
  completion: CompletionStatus
  copy: any
  finalizePending: boolean
  finalizeSent: boolean
  messages: ChatMessageRecord[]
  onFinalize: () => void | Promise<void>
  onSelectStarterPrompt: (prompt: string) => void | Promise<void>
  onSendMessage: (message: string) => void | Promise<void>
  phase: 'idle' | 'loading' | 'ready' | 'missing' | 'error'
  starterPrompts: string[]
  toast: { tone: 'success' | 'error'; message: string } | null
  typing: boolean
}

export default function ChatSurface({
  brief,
  chatError,
  completion,
  copy,
  finalizePending,
  finalizeSent,
  messages,
  onFinalize,
  onSelectStarterPrompt,
  onSendMessage,
  phase,
  starterPrompts,
  toast,
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

  const showStarters = phase === 'ready' && messages.length <= 1
  const disableComposer = phase !== 'ready' || finalizePending

  return (
    <section data-test="brief-received-chat-panel" className="flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-[32px] border border-[#e8d7ba]/14 bg-[#141a22] shadow-[0_30px_80px_rgba(0,0,0,0.32)]">
      <ChatHeader copy={copy.chat.header} />
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden px-4 py-4 min-[840px]:px-6">
        <MessageList messages={placeholderMessage} />
        {typing ? <TypingDots label={copy.chat.typingLabel} /> : null}
        {showStarters ? <StarterPrompts prompts={starterPrompts} onSelect={onSelectStarterPrompt} /> : null}
        {chatError ? <p className="mt-4 rounded-2xl border border-[#d8660b]/35 bg-[#2a1f17] px-4 py-3 text-sm text-[#ffd8bc]">{chatError}</p> : null}
      </div>
      <div className="sticky bottom-0 bg-[#141a22]">
        <Composer
          completion={completion}
          copy={copy.chat.composer}
          disabled={disableComposer}
          finalizePending={finalizePending}
          finalizeSent={finalizeSent}
          onFinalize={onFinalize}
          onSend={onSendMessage}
          toast={toast}
        />
      </div>
    </section>
  )
}
