import ChatSurface from '@/components/chat/ChatSurface'
import type { BriefRecord, ChatMessageRecord, CompletionStatus } from '@/lib/chat-intake'

interface CinderChatProps {
  brief: BriefRecord | null
  chatError: string | null
  completion: CompletionStatus
  copy: any
  finalizedBanner: { dateLabel: string; bannerText: string; recapLine: string | null } | null
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

export default function CinderChat(props: CinderChatProps) {
  return <ChatSurface {...props} />
}
