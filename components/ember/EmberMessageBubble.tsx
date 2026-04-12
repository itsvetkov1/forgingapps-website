import { Fragment } from 'react'
import type { EmberMessage } from '@/lib/ember-config'
import { parseChatText, splitChatBlocks } from '@/lib/chat-format.mjs'

interface EmberMessageBubbleProps {
  message: EmberMessage
}

export default function EmberMessageBubble({ message }: EmberMessageBubbleProps) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap bg-amber-600 text-white shadow-lg shadow-amber-600/15">
          {message.content}
        </div>
      </div>
    )
  }

  const blocks = splitChatBlocks(message.content)

  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border border-zinc-700 bg-zinc-800 text-zinc-100">
        <div className="space-y-2">
          {blocks.map((block, blockIndex) => (
            <div
              key={blockIndex}
              className={
                block.type === 'list-item'
                  ? 'rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-950/40 to-amber-900/20 px-3 py-2 shadow-sm'
                  : ''
              }
            >
              {parseChatText(block.text).map((segments, lineIndex) => (
                <Fragment key={lineIndex}>
                  {segments.map((segment, segmentIndex) => {
                    if (segment.link) {
                      return (
                        <a
                          key={segmentIndex}
                          href={segment.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            segment.bold
                              ? 'font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors'
                              : 'text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors'
                          }
                        >
                          {segment.text}
                        </a>
                      )
                    }
                    if (segment.bold) {
                      return (
                        <strong key={segmentIndex} className="font-semibold text-white">
                          {segment.text}
                        </strong>
                      )
                    }
                    return <span key={segmentIndex}>{segment.text}</span>
                  })}
                  {lineIndex < parseChatText(block.text).length - 1 && <br />}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
