import type { ReactNode } from 'react'
import type { ChatMessageRecord } from '@/lib/chat-intake'

interface MessageProps {
  message: ChatMessageRecord
}

function renderInline(content: string, keyPrefix: string): ReactNode[] {
  const segments: ReactNode[] = []
  const pattern = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\((https?:\/\/[^)]+)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null = pattern.exec(content)

  while (match) {
    if (match.index > lastIndex) {
      segments.push(content.slice(lastIndex, match.index))
    }

    if (match[2]) {
      segments.push(<strong key={`${keyPrefix}-strong-${match.index}`} className="font-semibold text-[#141a22]">{match[2]}</strong>)
    } else if (match[4] && match[5]) {
      segments.push(
        <a
          key={`${keyPrefix}-link-${match.index}`}
          href={match[5]}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#b04f00] underline decoration-[#d8660b]/45 underline-offset-4"
        >
          {match[4]}
        </a>,
      )
    }

    lastIndex = match.index + match[0].length
    match = pattern.exec(content)
  }

  if (lastIndex < content.length) {
    segments.push(content.slice(lastIndex))
  }

  return segments.length ? segments : [content]
}

function renderBlocks(content: string) {
  const lines = content.split(/\n+/).map((line) => line.trim()).filter(Boolean)
  const nodes: ReactNode[] = []
  let bulletBuffer: string[] = []

  const flushBullets = () => {
    if (!bulletBuffer.length) return
    nodes.push(
      <ul key={`bullets-${nodes.length}`} className="space-y-2 pl-5 text-sm leading-6 text-[#2c3137] list-disc marker:text-[#d8660b]">
        {bulletBuffer.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInline(item, `bullet-${index}`)}</li>
        ))}
      </ul>,
    )
    bulletBuffer = []
  }

  lines.forEach((line, index) => {
    if (line.startsWith('• ')) {
      bulletBuffer.push(line.slice(2))
      return
    }

    flushBullets()
    nodes.push(
      <p key={`paragraph-${index}`} className="text-sm leading-7 text-[#2c3137]">
        {renderInline(line, `paragraph-${index}`)}
      </p>,
    )
  })

  flushBullets()
  return nodes
}

export default function Message({ message }: MessageProps) {
  const isAssistant = message.role === 'assistant'

  return (
    <article className={`max-w-[90%] rounded-[24px] px-4 py-3 shadow-[0_12px_28px_rgba(15,20,25,0.06)] ${isAssistant ? 'self-start border border-[#eadfca] bg-white' : 'self-end bg-[#141a22] text-white'}`}>
      <p className={`mb-2 font-mono text-[11px] uppercase tracking-[0.22em] ${isAssistant ? 'text-[#8a8177]' : 'text-white/60'}`}>
        {isAssistant ? 'Cinder' : 'You'}
      </p>
      <div className={isAssistant ? 'text-[#141a22]' : 'text-white [&_strong]:text-white [&_a]:text-[#ffd4af]'}>{renderBlocks(message.content)}</div>
    </article>
  )
}
