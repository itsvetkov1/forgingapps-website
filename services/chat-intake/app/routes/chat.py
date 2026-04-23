from __future__ import annotations

import json
from typing import Literal

from fastapi import APIRouter
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, Field

from app.prompt_stack import DEFAULT_MODEL, DEFAULT_VARIANT, normalize_locale, normalize_variant
from app.services import generate_cinder_reply

router = APIRouter(prefix='/intake', tags=['intake'])
ALLOWED_MODELS = {DEFAULT_MODEL}
STARTER_PROMPTS = [
    'Walk me through what happens next',
    'How do you scope a project?',
    'What does payment look like?',
    'Can I see more of your work?',
]


class SessionPayload(BaseModel):
    brief_id: str = Field(default='FA-2604-TEST', max_length=64)
    firstName: str = Field(default='Mara', max_length=80)
    topic: str = Field(default='AI chatbot for customer support', max_length=280)
    locale: Literal['en', 'bg'] = Field(default='en')
    variant: str = Field(default=DEFAULT_VARIANT, max_length=64)


class ChatTurn(BaseModel):
    role: Literal['user', 'assistant']
    content: str = Field(max_length=4000)


class MessageRequest(BaseModel):
    session: SessionPayload
    history: list[ChatTurn] = Field(default_factory=list, max_length=40)
    message: str = Field(max_length=4000)
    model: str = Field(default=DEFAULT_MODEL, max_length=64)


TEST_PAGE = """<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>ForgingApps — Continue the conversation</title>
  <style>
    :root {
      --bg: #0f1419;
      --bg-soft: #141b24;
      --panel: #171e28;
      --panel-soft: #1c2530;
      --line: rgba(196,160,98,.16);
      --ink: #ece7de;
      --muted: #a8a39b;
      --muted-2: #7f7a72;
      --gold: #c4a062;
      --ember: #d8660b;
      --ember-soft: #e8852f;
      --success: #6abf8c;
      --shadow: 0 24px 80px rgba(0,0,0,.35);
      --radius-xl: 26px;
      --radius-lg: 18px;
      --radius-md: 12px;
      --font-display: Georgia, 'Times New Roman', serif;
      --font-body: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      --font-meta: 'JetBrains Mono', 'SFMono-Regular', ui-monospace, Menlo, Consolas, monospace;
    }

    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: radial-gradient(circle at 18% 88%, rgba(216,102,11,.16), transparent 28%), var(--bg); color: var(--ink); min-height: 100%; }
    body { font-family: var(--font-body); }
    button, input, textarea, select { font: inherit; }
    a { color: inherit; text-decoration: none; }

    .page {
      min-height: 100vh;
      display: grid;
      grid-template-columns: minmax(320px, 520px) minmax(0, 1fr);
    }

    .left {
      border-right: 1px solid var(--line);
      padding: 40px 36px 28px;
      display: flex;
      flex-direction: column;
      gap: 26px;
      background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,0));
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
      color: var(--gold);
      letter-spacing: .16em;
      font-size: 13px;
      text-transform: uppercase;
      font-family: var(--font-meta);
    }

    .brand-mark,
    .avatar-mark {
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background: radial-gradient(circle at 38% 35%, #f8d39f 0 18%, #e7a546 20%, #d8660b 58%, #8f3800 100%);
      box-shadow: 0 0 24px rgba(216,102,11,.45);
      flex: 0 0 auto;
    }

    .queued {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--gold);
      opacity: .92;
      font: 11px/1.5 var(--font-meta);
      letter-spacing: .22em;
      text-transform: uppercase;
    }

    .queued-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--gold);
      box-shadow: 0 0 0 6px rgba(196,160,98,.08);
    }

    .hero-title {
      margin: 0;
      font-family: var(--font-display);
      font-size: clamp(40px, 6vw, 64px);
      line-height: .98;
      letter-spacing: -.03em;
      text-transform: uppercase;
      max-width: 10ch;
    }

    .hero-copy {
      margin: 0;
      color: var(--muted);
      font-size: 17px;
      line-height: 1.75;
      max-width: 34rem;
    }

    .hero-copy strong { color: var(--gold); font-weight: 600; }

    .section-label {
      margin: 0;
      color: var(--muted-2);
      font: 11px/1.5 var(--font-meta);
      letter-spacing: .22em;
      text-transform: uppercase;
    }

    .steps {
      border-top: 1px solid var(--line);
    }

    .step {
      display: grid;
      grid-template-columns: 48px 1fr;
      gap: 16px;
      padding: 18px 0;
      border-bottom: 1px solid var(--line);
    }

    .step-num {
      color: var(--muted-2);
      font: 13px/1.4 var(--font-meta);
      letter-spacing: .16em;
      text-transform: uppercase;
    }

    .step-title {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0 0 4px;
      font-size: 18px;
      color: var(--ink);
    }

    .step-copy {
      margin: 0;
      color: var(--muted);
      font-size: 14px;
    }

    .now-pill {
      border: 1px solid rgba(196,160,98,.24);
      color: var(--gold);
      background: rgba(196,160,98,.08);
      border-radius: 999px;
      padding: 3px 9px;
      font: 10px/1 var(--font-meta);
      letter-spacing: .16em;
      text-transform: uppercase;
    }

    .footnote {
      margin-top: auto;
      color: var(--muted-2);
      font: 12px/1.7 var(--font-meta);
      max-width: 32rem;
    }

    .right {
      padding: 34px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .chat-shell {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--line);
      border-radius: var(--radius-xl);
      background: linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01));
      box-shadow: var(--shadow);
      overflow: hidden;
    }

    .chat-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 22px;
      border-bottom: 1px solid var(--line);
      background: rgba(255,255,255,.015);
    }

    .chat-header-main {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .chat-title {
      margin: 0;
      font-family: var(--font-display);
      font-size: 28px;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    .chat-subtitle {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 2px 0 0;
      color: var(--muted);
      font-size: 13px;
    }

    .chat-subtitle-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: var(--success);
      box-shadow: 0 0 0 5px rgba(106,191,140,.08);
    }

    .ghost-button {
      border: 1px solid var(--line);
      background: rgba(255,255,255,.01);
      color: var(--muted);
      border-radius: 12px;
      padding: 10px 14px;
      cursor: pointer;
      transition: .2s ease;
    }

    .ghost-button:hover { color: var(--ink); border-color: rgba(196,160,98,.3); }

    .chat-body {
      flex: 1;
      min-height: 0;
      padding: 24px 22px 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .message-wrap {
      max-width: min(720px, 88%);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .message-wrap.user {
      align-self: flex-end;
      text-align: left;
    }

    .message-bubble {
      border-radius: 18px;
      padding: 18px 18px 16px;
      border: 1px solid rgba(255,255,255,.05);
      background: var(--panel);
      color: var(--ink);
      line-height: 1.75;
      font-size: 15px;
      white-space: pre-wrap;
    }

    .message-wrap.user .message-bubble {
      background: rgba(216,102,11,.1);
      border-color: rgba(216,102,11,.18);
    }

    .message-meta {
      color: var(--muted-2);
      font: 11px/1.4 var(--font-meta);
      letter-spacing: .12em;
      text-transform: uppercase;
      padding: 0 4px;
    }

    .starter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 2px;
    }

    .starter-chip {
      border: 1px solid rgba(196,160,98,.2);
      background: rgba(255,255,255,.02);
      color: var(--gold);
      border-radius: 999px;
      padding: 11px 16px;
      cursor: pointer;
      font-size: 14px;
      transition: .2s ease;
    }

    .starter-chip:hover {
      border-color: rgba(196,160,98,.4);
      background: rgba(196,160,98,.08);
      color: var(--ink);
    }

    .typing {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      border-radius: 16px;
      background: var(--panel-soft);
      border: 1px solid rgba(255,255,255,.05);
      color: var(--muted);
      font-size: 14px;
    }

    .typing-dots {
      display: inline-flex;
      gap: 4px;
    }

    .typing-dots span {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--ember-soft);
      animation: pulse 1.2s infinite ease-in-out;
    }

    .typing-dots span:nth-child(2) { animation-delay: .15s; }
    .typing-dots span:nth-child(3) { animation-delay: .3s; }

    @keyframes pulse {
      0%, 80%, 100% { opacity: .35; transform: translateY(0); }
      40% { opacity: 1; transform: translateY(-2px); }
    }

    .composer {
      border-top: 1px solid var(--line);
      padding: 18px 22px 16px;
      background: rgba(255,255,255,.015);
      display: grid;
      gap: 12px;
    }

    .composer-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: end;
    }

    .composer textarea {
      min-height: 92px;
      max-height: 180px;
      resize: vertical;
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,.08);
      background: #111820;
      color: var(--ink);
      padding: 16px 18px;
      outline: none;
      line-height: 1.6;
    }

    .composer textarea:focus {
      border-color: rgba(196,160,98,.4);
      box-shadow: 0 0 0 4px rgba(196,160,98,.08);
    }

    .send-button {
      width: 54px;
      height: 54px;
      border: 0;
      border-radius: 16px;
      background: linear-gradient(180deg, var(--ember-soft), var(--ember));
      color: white;
      cursor: pointer;
      font-size: 22px;
      box-shadow: 0 14px 34px rgba(216,102,11,.3);
    }

    .send-button:disabled { opacity: .55; cursor: not-allowed; box-shadow: none; }

    .composer-meta {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      color: var(--muted-2);
      font: 11px/1.4 var(--font-meta);
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    .context-strip {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 14px;
    }

    .context-card {
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 16px 18px;
      background: rgba(255,255,255,.015);
      min-height: 98px;
    }

    .context-label {
      display: block;
      color: var(--muted-2);
      font: 11px/1.4 var(--font-meta);
      letter-spacing: .18em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .context-value {
      color: var(--ink);
      font-size: 15px;
      line-height: 1.6;
    }

    .control-grid {
      display: none;
    }

    @media (max-width: 980px) {
      .page { grid-template-columns: 1fr; }
      .left { border-right: 0; border-bottom: 1px solid var(--line); }
      .right { padding: 20px; }
      .context-strip { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class=\"page\">
    <aside class=\"left\">
      <div class=\"brand\"><span class=\"brand-mark\"></span><span>ForgingApps</span></div>
      <div class=\"queued\"><span class=\"queued-dot\"></span><span id=\"queuedLine\">BRIEF FA-2604-TEST · QUEUED</span></div>
      <div>
        <h1 class=\"hero-title\" id=\"headline\">Thanks, Mara — we've got your brief.</h1>
        <p class=\"hero-copy\" id=\"heroCopy\">Ivaylo reads every brief himself. While you're here, Cinder can help firm up <strong>scope</strong>, <strong>price</strong>, or <strong>timeline</strong> so the first call starts with a concrete plan.</p>
      </div>
      <div>
        <p class=\"section-label\">What happens next</p>
        <div class=\"steps\">
          <div class=\"step\">
            <div class=\"step-num\">01</div>
            <div>
              <p class=\"step-title\">Founder reads your brief <span class=\"now-pill\">Now</span></p>
              <p class=\"step-copy\">Within a week</p>
            </div>
          </div>
          <div class=\"step\">
            <div class=\"step-num\">02</div>
            <div>
              <p class=\"step-title\">Scoping call · 30 min</p>
              <p class=\"step-copy\">Within a week, on Google Meet</p>
            </div>
          </div>
          <div class=\"step\">
            <div class=\"step-num\">03</div>
            <div>
              <p class=\"step-title\">Written proposal</p>
              <p class=\"step-copy\">Scope · price · timeline · team</p>
            </div>
          </div>
          <div class=\"step\">
            <div class=\"step-num\">04</div>
            <div>
              <p class=\"step-title\">Kickoff</p>
              <p class=\"step-copy\">Once the proposal is accepted</p>
            </div>
          </div>
        </div>
      </div>
      <p class=\"footnote\">Every chat turn here is attached to the intake thread, so nothing gets lost between your brief and the first founder reply.</p>
    </aside>

    <main class=\"right\">
      <section class=\"chat-shell\">
        <div class=\"chat-header\">
          <div class=\"chat-header-main\">
            <span class=\"avatar-mark\"></span>
            <div>
              <h2 class=\"chat-title\">Cinder</h2>
              <div class=\"chat-subtitle\"><span class=\"chat-subtitle-dot\"></span><span>Assigned · reads your brief in context</span></div>
            </div>
          </div>
          <button class=\"ghost-button\" id=\"resetButton\" type=\"button\">New conversation</button>
        </div>

        <div class=\"chat-body\" id=\"transcript\"></div>

        <div class=\"composer\">
          <div class=\"composer-row\">
            <textarea id=\"message\" placeholder=\"Reply to Cinder, or ask anything about scope, timeline, price…\">Walk me through what happens next</textarea>
            <button id=\"send\" class=\"send-button\" type=\"button\" aria-label=\"Send message\">↑</button>
          </div>
          <div class=\"composer-meta\">
            <span>Enter sends · Shift+Enter for a newline</span>
            <span>Private · forgingapps.com</span>
          </div>
        </div>
      </section>

      <section class=\"context-strip\">
        <div class=\"context-card\">
          <span class=\"context-label\">Project</span>
          <div class=\"context-value\" id=\"topicDisplay\">AI chatbot for customer support</div>
        </div>
        <div class=\"context-card\">
          <span class=\"context-label\">Interest</span>
          <div class=\"context-value\" id=\"variantDisplay\">generic</div>
        </div>
        <div class=\"context-card\">
          <span class=\"context-label\">Locale</span>
          <div class=\"context-value\" id=\"localeDisplay\">en</div>
        </div>
      </section>

      <section class=\"control-grid\">
        <input id=\"brief_id\" value=\"FA-2604-TEST\" />
        <input id=\"firstName\" value=\"Mara\" />
        <input id=\"topic\" value=\"AI chatbot for customer support\" />
        <input id=\"model\" value=\"gpt-5.4\" />
        <select id=\"locale\"><option value=\"en\" selected>en</option><option value=\"bg\">bg</option></select>
        <input id=\"variant\" value=\"generic\" />
      </section>
    </main>
  </div>

  <script>
    const transcript = document.getElementById('transcript');
    const messageBox = document.getElementById('message');
    const sendButton = document.getElementById('send');
    const resetButton = document.getElementById('resetButton');
    const state = { history: [], typingNode: null };
    const starterPrompts = %STARTER_PROMPTS%;

    function escapeHtml(value) {
      return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
    }

    function currentSession() {
      return {
        brief_id: document.getElementById('brief_id').value,
        firstName: document.getElementById('firstName').value,
        topic: document.getElementById('topic').value,
        locale: document.getElementById('locale').value,
        variant: document.getElementById('variant').value,
      };
    }

    function syncChrome() {
      const session = currentSession();
      document.getElementById('queuedLine').textContent = `BRIEF ${session.brief_id} · QUEUED`;
      document.getElementById('headline').textContent = `Thanks, ${session.firstName} — we've got your brief.`;
      document.getElementById('heroCopy').innerHTML = `Ivaylo reads every brief himself. While you're here, Cinder can help firm up <strong>scope</strong>, <strong>price</strong>, or <strong>timeline</strong> so the first call starts with a concrete plan.`;
      document.getElementById('topicDisplay').textContent = session.topic;
      document.getElementById('variantDisplay').textContent = session.variant;
      document.getElementById('localeDisplay').textContent = session.locale;
    }

    function appendTurn(role, content) {
      const turn = { role, content };
      state.history.push(turn);
      const wrapper = document.createElement('div');
      wrapper.className = `message-wrap ${role}`;
      const label = role === 'assistant' ? 'Cinder' : 'You';
      wrapper.innerHTML = `
        <div class=\"message-bubble\">${escapeHtml(content)}</div>
        <div class=\"message-meta\">${label}</div>
      `;
      transcript.appendChild(wrapper);
      transcript.scrollTop = transcript.scrollHeight;
      updateStarterPrompts();
    }

    function clearTyping() {
      if (state.typingNode) {
        state.typingNode.remove();
        state.typingNode = null;
      }
    }

    function showTyping() {
      clearTyping();
      const typing = document.createElement('div');
      typing.className = 'typing';
      typing.innerHTML = `<span>Cinder is typing</span><span class=\"typing-dots\"><span></span><span></span><span></span></span>`;
      state.typingNode = typing;
      transcript.appendChild(typing);
      transcript.scrollTop = transcript.scrollHeight;
    }

    function updateStarterPrompts() {
      const existing = document.getElementById('starterPrompts');
      if (existing) existing.remove();
      if (state.history.length > 1) return;
      const row = document.createElement('div');
      row.id = 'starterPrompts';
      row.className = 'starter-row';
      for (const prompt of starterPrompts) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'starter-chip';
        button.textContent = prompt;
        button.addEventListener('click', () => sendMessage(prompt));
        row.appendChild(button);
      }
      transcript.appendChild(row);
    }

    async function sendMessage(forcedMessage) {
      const message = (forcedMessage ?? messageBox.value).trim();
      if (!message) return;
      appendTurn('user', message);
      if (!forcedMessage) messageBox.value = '';
      sendButton.disabled = true;
      showTyping();

      try {
        const response = await fetch('/intake/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session: currentSession(),
            history: state.history.slice(0, -1),
            message,
            model: document.getElementById('model').value,
          }),
        });
        const data = await response.json();
        clearTyping();
        appendTurn('assistant', data.reply || 'Something went wrong on our end, try again in a moment.');
      } catch (error) {
        clearTyping();
        appendTurn('assistant', 'Something went wrong on our end, try again in a moment.');
      } finally {
        sendButton.disabled = false;
      }
    }

    function resetConversation() {
      state.history = [];
      clearTyping();
      transcript.innerHTML = '';
      updateStarterPrompts();
      messageBox.value = 'Walk me through what happens next';
      messageBox.focus();
    }

    sendButton.addEventListener('click', () => sendMessage());
    resetButton.addEventListener('click', resetConversation);
    messageBox.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });

    syncChrome();
    updateStarterPrompts();
  </script>
</body>
</html>
"""


@router.get('/test', response_class=HTMLResponse)
def intake_test() -> HTMLResponse:
    return HTMLResponse(TEST_PAGE.replace('%STARTER_PROMPTS%', json.dumps(STARTER_PROMPTS)))


@router.post('/message')
def intake_message(request: MessageRequest) -> JSONResponse:
    try:
        session = request.session.model_dump()
        session['variant'] = normalize_variant(session.get('variant'))
        session['locale'] = normalize_locale(session.get('locale'))
        model = request.model.strip() or DEFAULT_MODEL
        if model not in ALLOWED_MODELS:
            return JSONResponse(
                {
                    'reply': 'Something went wrong on our end, try again in a moment.',
                    'usage': {},
                },
                status_code=400,
            )
        result = generate_cinder_reply(
            session=session,
            history=[turn.model_dump() for turn in request.history],
            message=request.message,
            model=model,
        )
        return JSONResponse(result)
    except Exception:
        return JSONResponse(
            {
                'reply': 'Something went wrong on our end, try again in a moment.',
                'usage': {},
            },
            status_code=502,
        )
