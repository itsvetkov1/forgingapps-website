import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildBriefReceivedPath,
  extractBriefIdFromSubmissionResponse,
  shouldHideSiteChrome,
} from '../lib/brief-received-routing.mjs'

test('buildBriefReceivedPath preserves locale and encodes the brief id query', () => {
  assert.equal(buildBriefReceivedPath('en', 'FA-2604-089'), '/en/brief-received?id=FA-2604-089')
  assert.equal(buildBriefReceivedPath('bg', 'FA 2604/089'), '/bg/brief-received?id=FA%202604%2F089')
})

test('extractBriefIdFromSubmissionResponse reads brief_id from JSON payloads', () => {
  assert.equal(extractBriefIdFromSubmissionResponse('{"brief_id":"FA-2604-089","status":"created"}'), 'FA-2604-089')
})

test('extractBriefIdFromSubmissionResponse falls back to null for empty or invalid payloads', () => {
  assert.equal(extractBriefIdFromSubmissionResponse(''), null)
  assert.equal(extractBriefIdFromSubmissionResponse('not-json'), null)
  assert.equal(extractBriefIdFromSubmissionResponse('{"status":"ok"}'), null)
})

test('shouldHideSiteChrome hides the global shell on localized brief-received routes', () => {
  assert.equal(shouldHideSiteChrome('/en/brief-received'), true)
  assert.equal(shouldHideSiteChrome('/bg/brief-received'), true)
  assert.equal(shouldHideSiteChrome('/en/brief-received.html?id=FA-2604-089'), true)
  assert.equal(shouldHideSiteChrome('/en/contact'), false)
})
