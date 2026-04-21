import ChatSurface from '@/components/chat/ChatSurface'
import type { BriefRecord, ChatMessageRecord, IntakeSessionState } from '@/lib/chat-intake'

interface CinderChatProps {
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

export default function CinderChat(props: CinderChatProps) {
  return <ChatSurface {...props} />
}
