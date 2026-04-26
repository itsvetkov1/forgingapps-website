export function buildProxyHeaders(requestHeaders = {}) {
  const headers = {
    'Content-Type': requestHeaders['content-type'] || 'application/json',
  }

  if (typeof requestHeaders.accept === 'string' && requestHeaders.accept.trim()) {
    headers.Accept = requestHeaders.accept
  }

  if (typeof requestHeaders['x-intake-secret'] === 'string' && requestHeaders['x-intake-secret'].trim()) {
    headers['X-Intake-Secret'] = requestHeaders['x-intake-secret']
  }

  if (typeof requestHeaders['x-synthetic-warmup'] === 'string' && requestHeaders['x-synthetic-warmup'].trim()) {
    headers['X-Synthetic-Warmup'] = requestHeaders['x-synthetic-warmup']
  }

  return headers
}
