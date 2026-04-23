'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BriefReceivedPage from '@/components/brief-received/BriefReceivedPage'
import { translations } from '@/lib/i18n/translations'
import {
  fetchBrief,
  finalizeBrief,
  sendTurn,
  type BriefRecord,
  type ChatMessageRecord,
  type CompletionStatus,
} from '@/lib/chat-intake'
import { getBriefReceivedOpeningMessage, getBriefReceivedStarterPrompts } from '@/lib/brief-received-content.mjs'

type ClientPhase = 'idle' | 'loading' | 'ready' | 'missing' | 'error'
type ToastTone = 'success' | 'error'

interface BriefReceivedClientProps {
  locale: 'en' | 'bg'
}

export default function BriefReceivedClient({ locale }: BriefReceivedClientProps) {
  const searchParams = useSearchParams()
  const copy = translations[locale].briefReceived
  const briefId = searchParams.get('id')?.trim() ?? ''
  const starterPrompts = useMemo(() => getBriefReceivedStarterPrompts(locale), [locale])

  const [phase, setPhase] = useState<ClientPhase>(() => (briefId ? 'loading' : 'missing'))
  const [brief, setBrief] = useState<BriefRecord | null>(null)
  const [messages, setMessages] = useState<ChatMessageRecord[]>([])
  const [typing, setTyping] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  const [completion, setCompletion] = useState<CompletionStatus>('none')
  const [finalizePending, setFinalizePending] = useState(false)
  const [finalizeSent, setFinalizeSent] = useState(false)
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!briefId) {
      setPhase('missing')
      setBrief(null)
      setMessages([])
      setCompletion('none')
      setFinalizeSent(false)
      setToast(null)
      return
    }

    setPhase('loading')
    setBrief(null)
    setMessages([])
    setChatError(null)
    setCompletion('none')
    setFinalizeSent(false)
    setToast(null)

    void fetchBrief(briefId)
      .then((result) => {
        if (cancelled) return
        setBrief(result)
        setMessages([
          {
            id: `opening-${result.id}`,
            role: 'assistant',
            content: getBriefReceivedOpeningMessage(locale, result),
          },
        ])
        setPhase('ready')
      })
      .catch(() => {
        if (cancelled) return
        setPhase('error')
      })

    return () => {
      cancelled = true
    }
  }, [briefId, locale])

  const handleSend = async (value: string) => {
    if (!brief || !value.trim() || typing || finalizePending) return

    const userMessage: ChatMessageRecord = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: value.trim(),
    }

    const nextHistory = [...messages, userMessage]
    setMessages(nextHistory)
    setTyping(true)
    setChatError(null)
    setToast(null)

    try {
      const response = await sendTurn({
        brief,
        locale,
        history: messages,
        message: value.trim(),
      })

      setMessages([
        ...nextHistory,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.reply,
        },
      ])
      setCompletion(response.completion)
    } catch {
      setChatError(copy.chat.errors.turnFailed)
    } finally {
      setTyping(false)
    }
  }

  const handleFinalize = async () => {
    if (!brief || finalizePending || finalizeSent || completion !== 'ready') return

    setFinalizePending(true)
    setChatError(null)
    setToast(null)

    try {
      const result = await finalizeBrief({ brief, locale, history: messages })
      if (result.emailed) {
        setFinalizeSent(true)
        setToast({ tone: 'success', message: copy.chat.summary.successToast })
        return
      }

      setToast({ tone: 'error', message: copy.chat.summary.errorToast })
    } catch {
      setToast({ tone: 'error', message: copy.chat.summary.errorToast })
    } finally {
      setFinalizePending(false)
    }
  }

  return (
    <BriefReceivedPage
      brief={brief}
      chatError={chatError}
      completion={completion}
      copy={copy}
      finalizePending={finalizePending}
      finalizeSent={finalizeSent}
      locale={locale}
      messages={messages}
      onFinalize={handleFinalize}
      onSelectStarterPrompt={handleSend}
      onSendMessage={handleSend}
      phase={phase}
      starterPrompts={starterPrompts}
      toast={toast}
      typing={typing}
    />
  )
}
