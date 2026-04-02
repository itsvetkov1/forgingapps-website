import test from 'node:test'
import assert from 'node:assert/strict'

import { parseChatText } from '../lib/chat-format.mjs'

test('parseChatText converts markdown bold markers into bold segments', () => {
  const lines = parseChatText('We sell **three hoodies** today.')

  assert.equal(lines.length, 1)
  assert.deepEqual(lines[0], [
    { text: 'We sell ', bold: false },
    { text: 'three hoodies', bold: true },
    { text: ' today.', bold: false },
  ])
})

test('parseChatText preserves blank lines for readable chat spacing', () => {
  const lines = parseChatText('Line one\n\nLine two')

  assert.equal(lines.length, 3)
  assert.deepEqual(lines[1], [{ text: '', bold: false }])
})
