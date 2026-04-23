import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
  buildFinalizedBannerModel,
  deriveBriefReceivedChatState,
} from '../lib/brief-received-state.mjs'
import { getBriefReceivedTimeline } from '../lib/brief-received-content.mjs'

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), 'utf8')
}

test('brief-received timeline promises a 24-hour founder review window in both locales', () => {
  const enTimeline = getBriefReceivedTimeline('en')
  const bgTimeline = getBriefReceivedTimeline('bg')

  assert.equal(enTimeline[0]?.meta, 'Within 24 hours on business days')
  assert.equal(bgTimeline[0]?.meta, 'До 24 часа в работни дни')
})

test('brief-received user message bubble keeps light copy on the darker user surface', async () => {
  const source = await read('../components/chat/Message.tsx')

  assert.match(source, /self-end border border-\[#e8d7ba\]\/45 bg-\[#1e2633\] text-\[#f8f0e3\]/)
  assert.match(source, /isAssistant \? 'text-\[#141a22\]' : 'text-\[#f8f0e3\]'/)
  assert.match(source, /isAssistant \? 'text-\[#b04f00\] decoration-\[#d8660b\]\/45' : 'text-\[#ffd4af\] decoration-\[#ffd4af\]\/45'/)
})

test('brief-received chat layout keeps the composer pinned while the message list scrolls', async () => {
  const [pageSource, leftSource, panelSource, chatSource, listSource] = await Promise.all([
    read('../components/brief-received/BriefReceivedPage.tsx'),
    read('../components/brief-received/LeftPanel.tsx'),
    read('../components/brief-received/RightPanel.tsx'),
    read('../components/chat/ChatSurface.tsx'),
    read('../components/chat/MessageList.tsx'),
  ])

  assert.match(pageSource, /bg-\[#111821\]/)
  assert.match(pageSource, /flex-col/)
  assert.match(leftSource, /order-2/)
  assert.match(panelSource, /order-1/)
  assert.match(panelSource, /bg-\[#111821\]/)
  assert.match(panelSource, /min-\[840px\]:sticky/)
  assert.match(panelSource, /min-\[840px\]:top-0/)
  assert.match(panelSource, /min-\[840px\]:h-screen/)
  assert.match(chatSource, /h-full min-h-0 flex-1/)
  assert.match(chatSource, /bg-\[#141a22\]/)
  assert.match(chatSource, /sticky bottom-0/)
  assert.match(listSource, /flex-1 min-h-0/)
  assert.doesNotMatch(listSource, /max-h-\[50vh\]/)
})

test('brief-received summary action exposes test hooks and 24-hour reply copy in both locales', async () => {
  const [composerSource, enSource, bgSource] = await Promise.all([
    read('../components/chat/Composer.tsx'),
    read('../lib/i18n/en.ts'),
    read('../lib/i18n/bg.ts'),
  ])

  assert.match(composerSource, /data-test="brief-received-send-summary-btn"/)
  assert.match(composerSource, /data-test="brief-received-summary-toast"/)
  assert.match(enSource, /Ivaylo will be in touch within 24 hours on business days/)
  assert.match(bgSource, /Ивайло ще се свърже с Вас до 24 часа в работни дни/)
})

test('brief-received hydrates prior chat history and skips opener when persisted messages exist', () => {
  const hydrated = deriveBriefReceivedChatState({
    briefId: 'FA-0423-API',
    openingMessage: 'Fresh opener that should stay hidden.',
    persistedMessages: [
      { role: 'user', content: 'First turn', created_at: '2026-04-23T10:00:00Z' },
      { role: 'assistant', content: 'Second turn', created_at: '2026-04-23T10:00:01Z' },
    ],
    finalized: false,
    finalizedAt: null,
    summaryPreview: null,
  })

  assert.deepEqual(hydrated.messages, [
    { id: 'FA-0423-API-0-user', role: 'user', content: 'First turn', createdAt: '2026-04-23T10:00:00Z' },
    { id: 'FA-0423-API-1-assistant', role: 'assistant', content: 'Second turn', createdAt: '2026-04-23T10:00:01Z' },
  ])
  assert.equal(hydrated.showStarterPrompts, false)
  assert.equal(hydrated.disableComposer, false)
  assert.equal(hydrated.finalizeSent, false)

  const fresh = deriveBriefReceivedChatState({
    briefId: 'FA-0000-NEW',
    openingMessage: 'Fresh opener stays visible.',
    persistedMessages: [],
    finalized: false,
    finalizedAt: null,
    summaryPreview: null,
  })

  assert.equal(fresh.messages.length, 1)
  assert.equal(fresh.messages[0]?.content, 'Fresh opener stays visible.')
  assert.equal(fresh.showStarterPrompts, true)
})

test('brief-received finalized banner model localizes the sent date and recap copy', () => {
  const enBanner = buildFinalizedBannerModel({
    locale: 'en',
    finalizedAt: '2026-04-23T13:01:21Z',
    summaryPreview: {
      project: 'API relaunch',
      timing: 'Next sprint',
      next_step: 'Founder follow-up call',
    },
  })

  assert.ok(enBanner.dateLabel.length > 0)
  assert.match(enBanner.bannerText, /Summary sent to Ivaylo on/)
  assert.equal(enBanner.recapLine, 'Topic: API relaunch · Next step: Founder follow-up call')

  const bgBanner = buildFinalizedBannerModel({
    locale: 'bg',
    finalizedAt: '2026-04-23T13:01:21Z',
    summaryPreview: {
      project: 'API relaunch',
      timing: 'Next sprint',
      next_step: 'Founder follow-up call',
    },
  })

  assert.match(bgBanner.bannerText, /Резюмето е изпратено до Ивайло на/)
  assert.equal(bgBanner.recapLine, 'Тема: API relaunch · Следваща стъпка: Founder follow-up call')
})

test('brief-received source wires finalized banner hooks, hydration endpoint, and read-only composer copy', async () => {
  const [clientSource, headerSource, composerSource, enSource, bgSource] = await Promise.all([
    read('../components/brief-received/BriefReceivedClient.tsx'),
    read('../components/chat/ChatHeader.tsx'),
    read('../components/chat/Composer.tsx'),
    read('../lib/i18n/en.ts'),
    read('../lib/i18n/bg.ts'),
  ])

  assert.match(clientSource, /fetchBriefMessages\(/)
  assert.match(headerSource, /brief-received-finalized-banner/)
  assert.match(headerSource, /brief-received-finalized-date/)
  assert.match(composerSource, /copy\.finalizedPlaceholder/)
  assert.match(enSource, /Summary sent to Ivaylo on \{date\}\. He'll be in touch within 24 hours on business days\./)
  assert.match(bgSource, /Резюмето е изпратено до Ивайло на \{date\}\. Той ще се свърже с Вас до 24 часа в работни дни\./)
})
