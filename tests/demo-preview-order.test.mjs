import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../app/demo/DemoContent.tsx', import.meta.url), 'utf8')

test('Veloura support preview shows customer question before assistant answer', () => {
  const questionIndex = source.indexOf('What sizes does the Heavyweight Hoodie come in?')
  const answerIndex = source.indexOf('The Heavyweight Hoodie comes in XS, S, M, L, XL, and XXL. Available now: XS to L.')

  assert.notEqual(questionIndex, -1, 'expected the preview question text to exist')
  assert.notEqual(answerIndex, -1, 'expected the preview answer text to exist')
  assert.ok(questionIndex < answerIndex, 'the user question must render above the assistant answer')
})
