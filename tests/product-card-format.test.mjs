import test from 'node:test'
import assert from 'node:assert/strict'

import { parseProductLine } from '../lib/chat-format.mjs'

test('parseProductLine extracts product card data from sale item text', () => {
  const parsed = parseProductLine('1. Heavyweight Hoodie — €48 (sale, was €65)')

  assert.deepEqual(parsed, {
    index: 1,
    name: 'Heavyweight Hoodie',
    currentPrice: '€48',
    previousPrice: '€65',
    onSale: true,
  })
})

test('parseProductLine extracts regular product card data', () => {
  const parsed = parseProductLine('3. Oversized Logo Hoodie — €75')

  assert.deepEqual(parsed, {
    index: 3,
    name: 'Oversized Logo Hoodie',
    currentPrice: '€75',
    previousPrice: null,
    onSale: false,
  })
})

test('parseProductLine ignores non-product list text', () => {
  assert.equal(parseProductLine('1. Hoodies & sweatshirts — 4 items'), null)
  assert.equal(parseProductLine('Tell me which section you want to explore.'), null)
})
