import { products, type Product } from '@/lib/veloura-shop-data'

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function formatCompactPrice(price: number) {
  return `€${Number.isInteger(price) ? price : price.toFixed(2)}`
}

function buildProductLine(product: Product, index: number) {
  const current = product.salePrice ?? product.price
  if (product.salePrice !== null) {
    return `${index}. ${product.name} — ${formatCompactPrice(current)} (sale, was ${formatCompactPrice(product.price)})`
  }
  return `${index}. ${product.name} — ${formatCompactPrice(current)}`
}

function findProductInMessage(message: string): Product | null {
  const normalizedMessage = normalize(message)

  const exact = products.find((product) => normalizedMessage.includes(normalize(product.name)))
  if (exact) return exact

  const tokenMatch = products
    .map((product) => ({
      product,
      score: normalize(product.name)
        .split(' ')
        .filter((token) => token.length > 2 && normalizedMessage.includes(token)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  return tokenMatch[0]?.product ?? null
}

function buildSizingReply(product: Product) {
  const available = product.sizes.filter((size) => size.available).map((size) => size.label)
  const unavailable = product.sizes.filter((size) => !size.available).map((size) => size.label)
  const availabilityLine = unavailable.length
    ? `Currently available: **${available.join(', ')}**. Right now **${unavailable.join(', ')}** are out of stock.`
    : `Currently available: **${available.join(', ')}**.`

  return [
    `The **${product.name}** comes in ${product.sizes.map((size) => size.label).join(', ')}.`,
    availabilityLine,
    `Fit note: ${product.description}`,
  ].join('\n')
}

function buildSimilarReply(product: Product) {
  const referencePrice = product.salePrice ?? product.price
  const similar = products
    .filter((candidate) => candidate.id !== product.id && candidate.categorySlug === product.categorySlug)
    .sort((a, b) => {
      const aPrice = a.salePrice ?? a.price
      const bPrice = b.salePrice ?? b.price
      return Math.abs(aPrice - referencePrice) - Math.abs(bPrice - referencePrice)
    })
    .slice(0, 3)

  if (similar.length === 0) {
    return `I could not find close matches to the **${product.name}** right now, but I can show you more from ${product.category}.`
  }

  return [
    `If you like the **${product.name}**, these are the closest alternatives I would show from **${product.category}**:`,
    ...similar.map((item, index) => buildProductLine(item, index + 1)),
    `If you want, I can also tell you more about any of these pieces individually.`,
  ].join('\n')
}

export function getLocalVelouraReply(message: string): string | null {
  const trimmed = String(message || '').trim()
  if (!trimmed) return null

  const product = findProductInMessage(trimmed)
  if (!product) return null

  const normalized = normalize(trimmed)
  const isSpecificSizingQuery =
    /what sizes? does/.test(normalized) ||
    /what size is .* available in/.test(normalized) ||
    (/sizes?/.test(normalized) && /(come in|available)/.test(normalized))

  if (isSpecificSizingQuery) {
    return buildSizingReply(product)
  }

  const isSimilarQuery = /similar/.test(normalized) && /(show|what|items|products)/.test(normalized)
  if (isSimilarQuery) {
    return buildSimilarReply(product)
  }

  return null
}
