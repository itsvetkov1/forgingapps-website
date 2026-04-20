type PagesContext = {
  request: Request
  next: () => Promise<Response>
}

function resolveLocale(header: string | null) {
  if (!header) return 'en'

  const tokens = header
    .split(',')
    .map((part) => part.trim().toLowerCase())

  for (const token of tokens) {
    if (token.startsWith('bg')) return 'bg'
    if (token.startsWith('en')) return 'en'
  }

  return 'en'
}

function redirectTo(url: URL, pathname: string) {
  const target = new URL(url.toString())
  target.pathname = pathname
  return Response.redirect(target.toString(), 301)
}

export async function onRequest(context: PagesContext) {
  const url = new URL(context.request.url)

  if (url.pathname === '/') {
    const locale = resolveLocale(context.request.headers.get('Accept-Language'))
    return redirectTo(url, `/${locale}`)
  }

  if (url.pathname === '/en/' || url.pathname === '/bg/') {
    return redirectTo(url, url.pathname.slice(0, -1))
  }

  return context.next()
}
