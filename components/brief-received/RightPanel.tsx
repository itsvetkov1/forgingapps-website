import BriefContextStrip from '@/components/brief-received/BriefContextStrip'
import CinderChat from '@/components/brief-received/CinderChat'
import type { BriefRecord, ChatMessageRecord, CompletionStatus } from '@/lib/chat-intake'

interface RightPanelProps {
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

export default function RightPanel(props: RightPanelProps) {
  const { brief, copy } = props

  return (
    <section className="order-1 flex min-h-[100svh] flex-col gap-4 bg-[#111821] px-4 py-4 min-[840px]:order-2 min-[840px]:sticky min-[840px]:top-0 min-[840px]:h-screen min-[840px]:border-l min-[840px]:border-[#e8d7ba]/10 min-[840px]:px-6 min-[840px]:py-6">
      <CinderChat {...props} />
      <BriefContextStrip brief={brief} copy={copy.contextStrip} />
    </section>
  )
}
