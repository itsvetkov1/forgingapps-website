import test from 'node:test'
import assert from 'node:assert/strict'

import { getProductActionPrompts } from '../lib/product-actions.mjs'

test('getProductActionPrompts creates product-specific next-step prompts', () => {
  const prompts = getProductActionPrompts('Heavyweight Hoodie')

  assert.deepEqual(prompts, [
    { label: 'View details', prompt: 'Tell me more about the Heavyweight Hoodie.' },
    { label: 'Ask about sizing', prompt: 'What sizes does the Heavyweight Hoodie come in?' },
    { label: 'Show similar', prompt: 'Show me similar items to the Heavyweight Hoodie.' },
  ])
})
