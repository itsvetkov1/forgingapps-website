'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BriefReceivedPage from '@/components/brief-received/BriefReceivedPage'
import { translations } from '@/lib/i18n/translations'
import { fetchBrief, sendTurn, submitBrief, type BriefRecord, type ChatMessageRecord, type IntakeSessionState } from '@/lib/chat-intake'
import { getBriefReceivedOpeningMessage, getBriefReceivedStarterPrompts } from '@/lib/brief-received-content.mjs'

type ClientPhase = 'idle' | 'loading' | 'ready' | 'missing' | 'error'

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
  const [submitting, setSubmitting] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const [sessionState, setSessionState] = useState<IntakeSessionState>('open')

  useEffect(() => {
    let cancelled = false

    if (!briefId) {
      setPhase('missing')
      setBrief(null)
      setMessages([])
      return
    }

    setPhase('loading')
    setBrief(null)
    setMessages([])
    setChatError(null)
    setSessionState('open')

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

  useEffect(() => {
    if (sessionState === 'minimum_met') {
      setAnnouncement(copy.chat.submitReadyAnnouncement)
    } else if (sessionState === 'submitted') {
      setAnnouncement(copy.chat.submittedAnnouncement)
    }
  }, [copy.chat.submitReadyAnnouncement, copy.chat.submittedAnnouncement, sessionState])

  const handleSend = async (value: string) => {
    if (!brief || !value.trim() || typing || submitting || sessionState === 'submitted') return

    const userMessage: ChatMessageRecord = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: value.trim(),
    }

    const nextHistory = [...messages, userMessage]
    setMessages(nextHistory)
    setTyping(true)
    setChatError(null)

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
      setSessionState(response.state)
    } catch {
      setChatError(copy.chat.errors.turnFailed)
    } finally {
      setTyping(false)
    }
  }

  const handleSubmitBrief = async () => {
    if (!brief || submitting || sessionState === 'submitted') return

    setSubmitting(true)
    setChatError(null)

    try {
      const result = await submitBrief(brief.sid)
      const confirmation = result.confirmation || copy.chat.submittedConfirmation
      setMessages((current) => [
        ...current,
        {
          id: `assistant-submit-${Date.now()}`,
          role: 'assistant',
          content: confirmation,
        },
      ])
      setSessionState(result.state)
    } catch {
      setChatError(copy.chat.errors.submitFailed)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <BriefReceivedPage
      announcement={announcement}
      brief={brief}
      chatError={chatError}
      copy={copy}
      locale={locale}
      messages={messages}
      onSelectStarterPrompt={handleSend}
      onSendMessage={handleSend}
      onSubmitBrief={handleSubmitBrief}
      phase={phase}
      sessionState={sessionState}
      starterPrompts={starterPrompts}
      submitting={submitting}
      typing={typing}
    />
  )
}
