export function getProxyTarget(pathname, search = '') {
  if (pathname === '/intake' || pathname.startsWith('/intake/')) {
    return {
      hostname: '127.0.0.1',
      port: 8001,
      path: `${pathname}${search}`,
    }
  }

  if (pathname.startsWith('/api/chat/')) {
    return {
      hostname: '127.0.0.1',
      port: 18889,
      path: `${pathname}${search}`,
    }
  }

  return null
}
