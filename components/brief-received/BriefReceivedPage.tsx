import LeftPanel from '@/components/brief-received/LeftPanel'
import RightPanel from '@/components/brief-received/RightPanel'
import type { BriefRecord, ChatMessageRecord, IntakeSessionState } from '@/lib/chat-intake'

interface BriefReceivedPageProps {
  announcement: string
  brief: BriefRecord | null
  chatError: string | null
  copy: any
  locale: 'en' | 'bg'
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

export default function BriefReceivedPage(props: BriefReceivedPageProps) {
  const {
    announcement,
    brief,
    chatError,
    copy,
    locale,
    messages,
    onSelectStarterPrompt,
    onSendMessage,
    onSubmitBrief,
    phase,
    sessionState,
    starterPrompts,
    submitting,
    typing,
  } = props

  return (
    <div className="min-h-screen bg-[#f4ede3] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1440px] min-[840px]:grid-cols-[520px_minmax(0,1fr)]">
        <LeftPanel brief={brief} copy={copy} locale={locale} phase={phase} />
        <RightPanel
          announcement={announcement}
          brief={brief}
          chatError={chatError}
          copy={copy}
          messages={messages}
          onSelectStarterPrompt={onSelectStarterPrompt}
          onSendMessage={onSendMessage}
          onSubmitBrief={onSubmitBrief}
          phase={phase}
          sessionState={sessionState}
          starterPrompts={starterPrompts}
          submitting={submitting}
          typing={typing}
        />
      </div>
    </div>
  )
}
