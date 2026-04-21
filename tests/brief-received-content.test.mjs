import test from 'node:test'
import assert from 'node:assert/strict'

import {
  getBriefReceivedOpeningMessage,
  getBriefReceivedStarterPrompts,
  getBriefReceivedTimeline,
} from '../lib/brief-received-content.mjs'

test('getBriefReceivedOpeningMessage uses the brief first name and lower-cased project name in English', () => {
  const message = getBriefReceivedOpeningMessage('en', {
    firstName: 'Mara',
    project: 'Support Chatbot',
  })

  assert.match(message, /Hey Mara\./)
  assert.match(message, /support chatbot just landed in Ivaylo's queue/i)
  assert.match(message, /scope/, 'expected scope to be mentioned in the opening message')
  assert.doesNotMatch(message, /price/i, 'opening message should not mention price')
})

test('getBriefReceivedStarterPrompts returns four localized prompts per locale', () => {
  assert.deepEqual(getBriefReceivedStarterPrompts('en'), [
    'Walk me through what happens next',
    'How do you scope a project?',
    'What does payment look like?',
    'Can I see more of your work?',
  ])

  assert.equal(getBriefReceivedStarterPrompts('bg').length, 4)
})

test('getBriefReceivedTimeline marks only the first step as active', () => {
  const timeline = getBriefReceivedTimeline('en')

  assert.equal(timeline.length, 4)
  assert.deepEqual(
    timeline.map((step) => step.state),
    ['active', 'pending', 'pending', 'pending'],
  )
})
