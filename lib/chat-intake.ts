export type ChatRole = 'assistant' | 'user'
export type CompletionStatus = 'none' | 'partial' | 'ready'

export interface BriefRecord {
  id: string
  firstName: string
  email: string
  project: string
  interest: string
  launch: string
  createdAt: string
  locale: 'en' | 'bg'
  sid: string
}

export interface ChatMessageRecord {
  id: string
  role: ChatRole
  content: string
}

export interface TurnResponse {
  reply: string
  completion: CompletionStatus
}

export interface FinalizeResult {
  summary: Record<string, unknown>
  emailed: boolean
  error: string | null
}

const CHAT_INTAKE_BASE_URL = 'https://chat.forgingapps.com/intake'

function buildJsonHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

function normalizeCompletion(value: unknown): CompletionStatus {
  return value === 'ready' || value === 'partial' ? value : 'none'
}

async function parseJsonResponse(response: Response) {
  const text = await response.text()

  try {
    return text ? JSON.parse(text) : {}
  } catch {
    throw new Error(text || `Request failed with ${response.status}`)
  }
}

export async function fetchBrief(briefId: string): Promise<BriefRecord> {
  const response = await fetch(`${CHAT_INTAKE_BASE_URL}/brief/${encodeURIComponent(briefId)}`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(response.status === 404 ? 'brief-not-found' : `brief-fetch-${response.status}`)
  }

  const data = await parseJsonResponse(response)

  return {
    id: String(data.id),
    firstName: String(data.firstName ?? data.first_name ?? ''),
    email: String(data.email ?? ''),
    project: String(data.project ?? ''),
    interest: String(data.interest ?? ''),
    launch: String(data.launch ?? ''),
    createdAt: String(data.createdAt ?? data.created_at ?? new Date().toISOString()),
    locale: data.locale === 'bg' ? 'bg' : 'en',
    sid: String(data.sid),
  }
}

export async function sendTurn(params: {
  brief: BriefRecord
  locale: 'en' | 'bg'
  history: ChatMessageRecord[]
  message: string
}): Promise<TurnResponse> {
  const { brief, locale, history, message } = params
  const nextHistory = history.map(({ role, content }) => ({ role, content }))

  const response = await fetch(`${CHAT_INTAKE_BASE_URL}/message`, {
    method: 'POST',
    credentials: 'include',
    headers: buildJsonHeaders(),
    body: JSON.stringify({
      session: {
        brief_id: brief.id,
        firstName: brief.firstName,
        topic: brief.project,
        locale,
        variant: 'generic',
      },
      history: nextHistory,
      message,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(body || `turn-failed-${response.status}`)
  }

  const data = await parseJsonResponse(response)
  return {
    reply: String(data.reply ?? data.message ?? ''),
    completion: normalizeCompletion(data.completion),
  }
}

export async function finalizeBrief(params: {
  brief: BriefRecord
  locale: 'en' | 'bg'
  history: ChatMessageRecord[]
}): Promise<FinalizeResult> {
  const { brief, locale, history } = params
  const response = await fetch(`${CHAT_INTAKE_BASE_URL}/finalize`, {
    method: 'POST',
    credentials: 'include',
    headers: buildJsonHeaders(),
    body: JSON.stringify({
      session: {
        brief_id: brief.id,
        firstName: brief.firstName,
        topic: brief.project,
        locale,
        variant: 'generic',
      },
      history: history.map(({ role, content }) => ({ role, content })),
      brief_id: brief.id,
      locale,
    }),
  })

  const data = await parseJsonResponse(response)
  if (!response.ok) {
    throw new Error(String(data.error ?? data.detail ?? `finalize-failed-${response.status}`))
  }

  return {
    summary: typeof data.summary === 'object' && data.summary ? data.summary : {},
    emailed: Boolean(data.emailed),
    error: data.error ? String(data.error) : null,
  }
}
