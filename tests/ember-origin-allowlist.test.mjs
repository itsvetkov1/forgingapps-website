import test from 'node:test'
import assert from 'node:assert/strict'

import { isAllowedOrigin } from '../scripts/ember-origin-allowlist.mjs'

test('isAllowedOrigin permits the chat host for same-origin intake testing', () => {
  assert.equal(isAllowedOrigin('https://chat.forgingapps.com'), true)
})

test('isAllowedOrigin still permits the main site origins', () => {
  assert.equal(isAllowedOrigin('https://forgingapps.com'), true)
  assert.equal(isAllowedOrigin('https://www.forgingapps.com'), true)
})

test('isAllowedOrigin rejects unknown origins', () => {
  assert.equal(isAllowedOrigin('https://evil.example.com'), false)
})
