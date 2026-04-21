import test from 'node:test'
import assert from 'node:assert/strict'

import { getProxyTarget } from '../scripts/ember-proxy-routing.mjs'
import { getAllowedOrigin } from '../scripts/ember-origin-allowlist.mjs'

for (const pathname of ['/intake/health', '/intake/test', '/intake/message']) {
  test(`getProxyTarget routes ${pathname} to the chat-intake backend`, () => {
    assert.deepEqual(getProxyTarget(pathname), {
      hostname: '127.0.0.1',
      port: 8001,
      path: pathname,
      contentType: pathname === '/intake/test' ? 'text/html; charset=utf-8' : 'application/json; charset=utf-8',
    })
  })
}

test('getProxyTarget routes brief bootstrap paths to the chat-intake backend', () => {
  assert.deepEqual(getProxyTarget('/intake/brief/FA-2604-201'), {
    hostname: '127.0.0.1',
    port: 8001,
    path: '/intake/brief/FA-2604-201',
    contentType: 'application/json; charset=utf-8',
  })
})

test('getProxyTarget does not expose the rest of the intake namespace yet', () => {
  assert.equal(getProxyTarget('/intake/session/abc'), null)
})

test('getProxyTarget leaves non-intake Ember paths untouched', () => {
  assert.equal(getProxyTarget('/api/ember/message'), null)
})

test('getAllowedOrigin falls back to wildcard for missing or disallowed origins', () => {
  assert.equal(getAllowedOrigin(undefined), '*')
  assert.equal(getAllowedOrigin('https://evil.example'), '*')
})

test('getAllowedOrigin echoes allowlisted origins for credentialed requests', () => {
  assert.equal(getAllowedOrigin('https://forgingapps.com'), 'https://forgingapps.com')
  assert.equal(getAllowedOrigin('https://chat.forgingapps.com'), 'https://chat.forgingapps.com')
})
