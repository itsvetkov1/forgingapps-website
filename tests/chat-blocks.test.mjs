import test from 'node:test'
import assert from 'node:assert/strict'

import { splitChatBlocks } from '../lib/chat-format.mjs'

test('splitChatBlocks turns numbered product lines into separate blocks', () => {
  const blocks = splitChatBlocks('Here are the hoodie options:\n\n1. Heavyweight Hoodie — €48\n2. Zip-Up Sweatshirt — €52')

  assert.deepEqual(blocks, [
    { type: 'paragraph', text: 'Here are the hoodie options:' },
    { type: 'list-item', text: '1. Heavyweight Hoodie — €48' },
    { type: 'list-item', text: '2. Zip-Up Sweatshirt — €52' },
  ])
})
