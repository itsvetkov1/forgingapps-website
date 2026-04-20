import test from 'node:test'
import assert from 'node:assert/strict'

import { getProxyTarget } from '../scripts/ember-proxy-routing.mjs'

test('getProxyTarget routes intake health to the chat-intake backend', () => {
  assert.deepEqual(getProxyTarget('/intake/health'), {
    hostname: '127.0.0.1',
    port: 8001,
    path: '/intake/health',
    contentType: 'application/json; charset=utf-8',
  })
})

test('getProxyTarget does not expose the rest of the intake namespace yet', () => {
  assert.equal(getProxyTarget('/intake/session/abc'), null)
})

test('getProxyTarget leaves non-intake Ember paths untouched', () => {
  assert.equal(getProxyTarget('/api/ember/message'), null)
})
