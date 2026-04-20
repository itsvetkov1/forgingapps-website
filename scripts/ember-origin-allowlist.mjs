const ORIGIN_ALLOWLIST = new Set([
  'https://forgingapps.com',
  'https://www.forgingapps.com',
  'https://chat.forgingapps.com',
  'https://forgingapps.pages.dev',
  'http://localhost:3000',
  'http://localhost:3001',
])

export function isAllowedOrigin(origin) {
  return ORIGIN_ALLOWLIST.has(origin)
}

export function getAllowedOrigin(origin) {
  return origin && isAllowedOrigin(origin) ? origin : '*'
}
