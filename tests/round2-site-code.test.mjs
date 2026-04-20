import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

function read(relativePath) {
  return readFileSync(path.join(repoRoot, relativePath), 'utf8')
}

test('contact form wires accessibility error metadata and a honeypot field', () => {
  const source = read('components/ContactForm.tsx')

  assert.match(source, /aria-invalid/)
  assert.match(source, /aria-describedby|aria-errormessage/)
  assert.match(source, /honeypot|website/)
})

test('ember chat window contains a focus trap implementation', () => {
  const source = read('components/ember/EmberChatWindow.tsx')

  assert.match(source, /Tab/)
  assert.match(source, /shiftKey/)
  assert.match(source, /focus\(/)
})

test('cloudflare edge routing exists for locale-aware root redirects', () => {
  const middlewarePath = path.join(repoRoot, 'functions', '_middleware.ts')
  assert.equal(existsSync(middlewarePath), true)

  const source = read('functions/_middleware.ts')
  assert.match(source, /Accept-Language/)
  assert.match(source, /\/bg/)
  assert.match(source, /Response\.redirect/)
})

test('redirect rules normalize locale trailing slashes in a single rule set', () => {
  const source = read('public/_redirects')

  assert.match(source, /^\/en\/\s+https:\/\/forgingapps\.com\/en\s+301$/m)
  assert.match(source, /^\/bg\/\s+https:\/\/forgingapps\.com\/bg\s+301$/m)
})

test('veloura demo source no longer contains forbidden EUR UI tokens', () => {
  const literalFiles = [
    'app/demo/veloura-support/VelouraSupportDemoClient.tsx',
    'lib/veloura-shop-data.ts',
  ]

  for (const relativePath of literalFiles) {
    const doubleQuotedStrings = Array.from(read(relativePath).matchAll(/"([^"]+)"/g), (match) => match[1])
    assert.equal(doubleQuotedStrings.some((value) => /\bEUR\b/.test(value)), false)
  }
})
