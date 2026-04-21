import BriefContextStrip from '@/components/brief-received/BriefContextStrip'
import CinderChat from '@/components/brief-received/CinderChat'
import type { BriefRecord, ChatMessageRecord, IntakeSessionState } from '@/lib/chat-intake'

interface RightPanelProps {
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

export default function RightPanel(props: RightPanelProps) {
  const { brief, copy } = props

  return (
    <section className="flex min-h-screen flex-col justify-between bg-[#f4ede3] px-4 py-4 min-[840px]:px-6 min-[840px]:py-6">
      <CinderChat {...props} />
      <BriefContextStrip brief={brief} copy={copy.contextStrip} />
    </section>
  )
}
