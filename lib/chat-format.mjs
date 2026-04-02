export function parseChatText(text) {
  return String(text || '')
    .split('\n')
    .map((line) => {
      const parts = line.split('**')
      if (parts.length === 1) {
        return [{ text: line, bold: false }]
      }

      return parts.map((part, index) => ({
        text: part,
        bold: index % 2 === 1,
      }))
    })
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
  const match = String(line || '').match(/^(\d+)\.\s+(.+?)\s+—\s+(€\d+)(?:\s+\(sale, was\s+(€\d+)\))?$/)
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
