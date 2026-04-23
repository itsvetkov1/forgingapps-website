import LeftPanel from '@/components/brief-received/LeftPanel'
import RightPanel from '@/components/brief-received/RightPanel'
import type { BriefRecord, ChatMessageRecord, CompletionStatus } from '@/lib/chat-intake'

interface BriefReceivedPageProps {
  brief: BriefRecord | null
  chatError: string | null
  completion: CompletionStatus
  copy: any
  finalizePending: boolean
  finalizeSent: boolean
  locale: 'en' | 'bg'
  messages: ChatMessageRecord[]
  onFinalize: () => void | Promise<void>
  onSelectStarterPrompt: (prompt: string) => void | Promise<void>
  onSendMessage: (message: string) => void | Promise<void>
  phase: 'idle' | 'loading' | 'ready' | 'missing' | 'error'
  starterPrompts: string[]
  toast: { tone: 'success' | 'error'; message: string } | null
  typing: boolean
}

export default function BriefReceivedPage(props: BriefReceivedPageProps) {
  const {
    brief,
    chatError,
    completion,
    copy,
    finalizePending,
    finalizeSent,
    locale,
    messages,
    onFinalize,
    onSelectStarterPrompt,
    onSendMessage,
    phase,
    starterPrompts,
    toast,
    typing,
  } = props

  return (
    <div className="min-h-screen bg-[#111821] text-[#f3ede3]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col min-[840px]:grid min-[840px]:grid-cols-[520px_minmax(0,1fr)] min-[840px]:items-start">
        <LeftPanel brief={brief} copy={copy} locale={locale} phase={phase} />
        <RightPanel
          brief={brief}
          chatError={chatError}
          completion={completion}
          copy={copy}
          finalizePending={finalizePending}
          finalizeSent={finalizeSent}
          messages={messages}
          onFinalize={onFinalize}
          onSelectStarterPrompt={onSelectStarterPrompt}
          onSendMessage={onSendMessage}
          phase={phase}
          starterPrompts={starterPrompts}
          toast={toast}
          typing={typing}
        />
      </div>
    </div>
  )
}
