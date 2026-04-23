import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

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

test('brief-received user message bubble keeps light copy on the dark surface', async () => {
  const source = await read('../components/chat/Message.tsx')

  assert.match(source, /self-end bg-\[#141a22\] text-\[#f8f0e3\]/)
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

  assert.match(pageSource, /flex-col/)
  assert.match(leftSource, /order-2/)
  assert.match(panelSource, /order-1/)
  assert.match(panelSource, /min-\[840px\]:sticky/)
  assert.match(panelSource, /min-\[840px\]:top-0/)
  assert.match(panelSource, /min-\[840px\]:h-screen/)
  assert.match(chatSource, /h-full min-h-0 flex-1/)
  assert.match(chatSource, /sticky bottom-0/)
  assert.match(listSource, /flex-1 min-h-0/)
  assert.doesNotMatch(listSource, /max-h-\[50vh\]/)
})

test('brief-received submission copy matches the 24-hour reply promise in both locales', async () => {
  const [enSource, bgSource] = await Promise.all([
    read('../lib/i18n/en.ts'),
    read('../lib/i18n/bg.ts'),
  ])

  assert.match(enSource, /he’ll be in touch within 24 hours on business days/)
  assert.match(bgSource, /ще се свърже с Вас до 24 часа в работни дни/)
})
