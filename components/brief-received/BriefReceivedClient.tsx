'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BriefReceivedPage from '@/components/brief-received/BriefReceivedPage'
import { translations } from '@/lib/i18n/translations'
import {
  fetchBrief,
  fetchBriefMessages,
  finalizeBrief,
  sendTurn,
  type BriefRecord,
  type ChatMessageRecord,
  type CompletionStatus,
} from '@/lib/chat-intake'
import { getBriefReceivedOpeningMessage, getBriefReceivedStarterPrompts } from '@/lib/brief-received-content.mjs'
import { buildFinalizedBannerModel, deriveBriefReceivedChatState } from '@/lib/brief-received-state.mjs'

type ClientPhase = 'idle' | 'loading' | 'ready' | 'missing' | 'error'
type ToastTone = 'success' | 'error'
type SummaryPreview = { project: string; timing: string; next_step: string } | null
type FinalizedBanner = { dateLabel: string; bannerText: string; recapLine: string | null } | null

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
  const [finalizedAt, setFinalizedAt] = useState<string | null>(null)
  const [summaryPreview, setSummaryPreview] = useState<SummaryPreview>(null)
  const [toast, setToast] = useState<{ tone: ToastTone; message: string } | null>(null)

  useEffect(() => {
    let cancelled = false

    if (!briefId) {
      setPhase('missing')
      setBrief(null)
      setMessages([])
      setCompletion('none')
      setFinalizeSent(false)
      setFinalizedAt(null)
      setSummaryPreview(null)
      setToast(null)
      return
    }

    setPhase('loading')
    setBrief(null)
    setMessages([])
    setChatError(null)
    setCompletion('none')
    setFinalizeSent(false)
    setFinalizedAt(null)
    setSummaryPreview(null)
    setToast(null)

    void Promise.all([fetchBrief(briefId), fetchBriefMessages(briefId)])
      .then(([briefResult, messageResult]) => {
        if (cancelled) return
        const openingMessage = getBriefReceivedOpeningMessage(locale, briefResult)
        const hydrated = deriveBriefReceivedChatState({
          briefId: briefResult.id,
          openingMessage,
          persistedMessages: messageResult.messages as any,
          finalized: messageResult.finalized,
          finalizedAt: messageResult.finalizedAt as any,
          summaryPreview: messageResult.summaryPreview as any,
        }) as {
          messages: ChatMessageRecord[]
          finalizeSent: boolean
          finalizedAt: string | null
          summaryPreview: SummaryPreview
        }

        setBrief(briefResult)
        setMessages(hydrated.messages)
        setFinalizeSent(hydrated.finalizeSent)
        setFinalizedAt(hydrated.finalizedAt)
        setSummaryPreview(hydrated.summaryPreview)
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
    if (!brief || !value.trim() || typing || finalizePending || finalizeSent) return

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
        const refreshed = await fetchBriefMessages(brief.id)
        const hydrated = deriveBriefReceivedChatState({
          briefId: brief.id,
          openingMessage: getBriefReceivedOpeningMessage(locale, brief),
          persistedMessages: refreshed.messages as any,
          finalized: refreshed.finalized,
          finalizedAt: refreshed.finalizedAt as any,
          summaryPreview: refreshed.summaryPreview as any,
        }) as {
          messages: ChatMessageRecord[]
          finalizeSent: boolean
          finalizedAt: string | null
          summaryPreview: SummaryPreview
        }
        setMessages(hydrated.messages)
        setFinalizeSent(hydrated.finalizeSent)
        setFinalizedAt(hydrated.finalizedAt)
        setSummaryPreview(hydrated.summaryPreview)
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

  const finalizedBanner = useMemo<FinalizedBanner>(() => {
    if (!finalizeSent || !finalizedAt) return null
    return buildFinalizedBannerModel({
      locale,
      finalizedAt,
      summaryPreview,
      copy: copy.chat.finalizedBanner,
    } as any) as FinalizedBanner
  }, [copy.chat.finalizedBanner, finalizeSent, finalizedAt, locale, summaryPreview])

  return (
    <BriefReceivedPage
      brief={brief}
      chatError={chatError}
      completion={completion}
      copy={copy}
      finalizedBanner={finalizedBanner}
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
