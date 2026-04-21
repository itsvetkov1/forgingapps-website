'use client'

import { useEffect, useRef } from 'react'
import Message from '@/components/chat/Message'
import type { ChatMessageRecord } from '@/lib/chat-intake'

interface MessageListProps {
  messages: ChatMessageRecord[]
}

export default function MessageList({ messages }: MessageListProps) {
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!listRef.current) return
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  return (
    <div ref={listRef} role="log" aria-live="polite" className="flex max-h-[50vh] flex-col gap-4 overflow-y-auto pr-1">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}
