export function parseChatText(text) {
  const lines = String(text || '').split('\n')
  const result = []

  for (const line of lines) {
    const segments = []
    // Split by bold markers
    const boldParts = line.split('**')

    for (let i = 0; i < boldParts.length; i++) {
      const isBold = i % 2 === 1
      const part = boldParts[i]
      if (!part) continue

      // Within each part, find [text](url) links - now with better regex
      // This regex handles:
      // - [text](https://url)
      // - [text](http://url)
      // - [text](/relative/url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      let lastIndex = 0
      let match

      while ((match = linkRegex.exec(part)) !== null) {
        if (match.index > lastIndex) {
          segments.push({ text: part.slice(lastIndex, match.index), bold: isBold, link: null })
        }
        // match[1] is the link text, match[2] is the URL
        const url = match[2]
        // Only create a link if URL looks valid (starts with http, https, or /)
        if (/^(https?:\/\/|\/)/.test(url)) {
          segments.push({ text: match[1], bold: isBold, link: url })
        } else {
          // If not valid URL format, treat the whole thing as text
          segments.push({ text: match[0], bold: isBold, link: null })
        }
        lastIndex = match.index + match[0].length
      }

      if (lastIndex < part.length) {
        segments.push({ text: part.slice(lastIndex), bold: isBold, link: null })
      }
    }

    if (segments.length === 0) {
      segments.push({ text: line, bold: false, link: null })
    }

    result.push(segments)
  }

  return result
}

export function splitChatBlocks(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => ({
      type: /^\d+\.\s/.test(line) ? 'list-item' : 'paragraph',
      text: line,
    }))
}

export function parseProductLine(line) {
  const match = String(line || '').match(/^(\d+)\.\s+(.+?)\s+\u2014\s+(\u20ac\d+)(?:\s+\(sale, was\s+(\u20ac\d+)\))?$/)
  if (!match) return null

  const [, index, name, currentPrice, previousPrice] = match
  if (/items$/i.test(currentPrice)) return null

  return {
    index: Number(index),
    name,
    currentPrice,
    previousPrice: previousPrice || null,
    onSale: Boolean(previousPrice),
  }
}
