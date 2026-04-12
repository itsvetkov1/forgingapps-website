export function parseChatText(text) {
  const lines = String(text || '').split('\n')
  const result = []

  for (const line of lines) {
    const segments = []
    // Parse links FIRST before splitting on bold markers.
    // The API returns [**bold text**](url) so splitting on ** first
    // destroys the [text](url) pattern before the link regex can match.
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    let lastIndex = 0
    let match

    while ((match = linkRegex.exec(line)) !== null) {
      // Handle any text before this link
      const before = line.slice(lastIndex, match.index)
      if (before) {
        parseBoldSegments(segments, before)
      }

      const rawLinkText = match[1]
      const url = match[2]

      if (/^(https?:\/\/|\/)/.test(url)) {
        // Strip ** wrappers from link text if the whole text is bolded
        const isBold = rawLinkText.startsWith('**') && rawLinkText.endsWith('**') && rawLinkText.length > 4
        const linkText = isBold ? rawLinkText.slice(2, -2) : rawLinkText
        segments.push({ text: linkText, bold: isBold, link: url })
      } else {
        // Not a valid URL — treat the whole match as plain text
        parseBoldSegments(segments, match[0])
      }
      lastIndex = match.index + match[0].length
    }

    // Handle remaining text after the last link
    const remaining = line.slice(lastIndex)
    if (remaining) {
      parseBoldSegments(segments, remaining)
    }

    if (segments.length === 0) {
      segments.push({ text: line, bold: false, link: null })
    }

    result.push(segments)
  }

  return result
}

function parseBoldSegments(segments, text) {
  const parts = text.split('**')
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue
    segments.push({ text: part, bold: i % 2 === 1, link: null })
  }
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
