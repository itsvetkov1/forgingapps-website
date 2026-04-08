export function getVelouraProxyUrl(): string {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1') {
      return 'http://127.0.0.1:18893/api/chat/message'
    }
  }
  return 'https://chat.forgingapps.com/api/chat/message'
}
