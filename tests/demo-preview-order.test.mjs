import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const demoSource = readFileSync(new URL('../app/demo/DemoContent.tsx', import.meta.url), 'utf8')
const supportDemoSource = readFileSync(new URL('../app/demo/veloura-support/VelouraSupportDemoClient.tsx', import.meta.url), 'utf8')

test('Veloura support preview shows customer question before assistant answer', () => {
  const questionIndex = demoSource.indexOf('What sizes does the Heavyweight Hoodie come in?')
  const answerIndex = demoSource.indexOf('The Heavyweight Hoodie comes in XS, S, M, L, XL, and XXL. Available now: XS to L.')

  assert.notEqual(questionIndex, -1, 'expected the preview question text to exist')
  assert.notEqual(answerIndex, -1, 'expected the preview answer text to exist')
  assert.ok(questionIndex < answerIndex, 'the user question must render above the assistant answer')
})

test('Veloura support example exchanges render customer question before assistant answer', () => {
  const userBubbleIndex = supportDemoSource.indexOf('{exchange.user}')
  const assistantBubbleIndex = supportDemoSource.indexOf('{exchange.assistant}')

  assert.notEqual(userBubbleIndex, -1, 'expected the example exchange user bubble to exist')
  assert.notEqual(assistantBubbleIndex, -1, 'expected the example exchange assistant bubble to exist')
  assert.ok(userBubbleIndex < assistantBubbleIndex, 'the user question must render above the assistant answer')
})
