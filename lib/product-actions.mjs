export function getProductActionPrompts(productName) {
  const safeName = String(productName || '').trim()
  if (!safeName) return []

  return [
    { label: 'View details', prompt: `Tell me more about the ${safeName}.` },
    { label: 'Ask about sizing', prompt: `What sizes does the ${safeName} come in?` },
    { label: 'Show similar', prompt: `Show me similar items to the ${safeName}.` },
  ]
}
