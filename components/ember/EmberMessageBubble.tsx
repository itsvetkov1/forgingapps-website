import type { EmberMessage } from '@/lib/ember-config'

interface EmberMessageBubbleProps {
  message: EmberMessage
}

export default function EmberMessageBubble({ message }: EmberMessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/15'
            : 'border border-zinc-700 bg-zinc-800 text-zinc-100'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
