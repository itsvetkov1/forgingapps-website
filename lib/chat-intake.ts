export type IntakeSessionState = 'open' | 'minimum_met' | 'ready_to_submit' | 'submitted'
export type ChatRole = 'assistant' | 'user'

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
  state: IntakeSessionState
}

const CHAT_INTAKE_BASE_URL = 'https://chat.forgingapps.com/intake'

function buildJsonHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

function normalizeState(value: unknown): IntakeSessionState {
  if (value === 'minimum_met' || value === 'ready_to_submit' || value === 'submitted') {
    return value
  }

  return 'open'
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
  const turnUrl = `${CHAT_INTAKE_BASE_URL}/session/${encodeURIComponent(brief.sid)}/turn`
  const nextHistory = history.map(({ role, content }) => ({ role, content }))

  const primary = await fetch(turnUrl, {
    method: 'POST',
    credentials: 'include',
    headers: buildJsonHeaders(),
    body: JSON.stringify({ locale, message, history: nextHistory }),
  })

  if (primary.ok) {
    const data = await parseJsonResponse(primary)
    return {
      reply: String(data.reply ?? data.message ?? ''),
      state: normalizeState(data.state),
    }
  }

  if (primary.status !== 404) {
    const body = await primary.text()
    throw new Error(body || `turn-failed-${primary.status}`)
  }

  const legacy = await fetch(`${CHAT_INTAKE_BASE_URL}/message`, {
    method: 'POST',
    credentials: 'include',
    headers: buildJsonHeaders(),
    body: JSON.stringify({
      session: {
        sid: brief.sid,
        locale,
        name: brief.firstName,
        email: brief.email,
        project: brief.project,
        interest: brief.interest,
        launch: brief.launch,
      },
      history: nextHistory,
      message,
    }),
  })

  if (!legacy.ok) {
    const body = await legacy.text()
    throw new Error(body || `legacy-turn-failed-${legacy.status}`)
  }

  const data = await parseJsonResponse(legacy)
  return {
    reply: String(data.reply ?? data.message ?? ''),
    state: normalizeState(data.state),
  }
}

export async function submitBrief(sid: string) {
  const response = await fetch(`${CHAT_INTAKE_BASE_URL}/session/${encodeURIComponent(sid)}/submit`, {
    method: 'POST',
    credentials: 'include',
    headers: buildJsonHeaders(),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(body || `submit-failed-${response.status}`)
  }

  const data = await parseJsonResponse(response)
  return {
    state: normalizeState(data.state || 'submitted'),
    confirmation: String(data.confirmation ?? data.message ?? ''),
  }
}
