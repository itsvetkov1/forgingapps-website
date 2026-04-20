export function getProxyTarget(pathname, search = '') {
  if (pathname === '/intake/health' || pathname === '/intake/message' || pathname === '/intake/test') {
    return {
      hostname: '127.0.0.1',
      port: 8001,
      path: `${pathname}${search}`,
      contentType: pathname === '/intake/test' ? 'text/html; charset=utf-8' : 'application/json; charset=utf-8',
    }
  }

  if (pathname.startsWith('/api/chat/')) {
    return {
      hostname: '127.0.0.1',
      port: 18889,
      path: `${pathname}${search}`,
      contentType: 'application/json; charset=utf-8',
    }
  }

  return null
}
