#!/usr/bin/env python3
"""
sweep_inactive.py — ForgingApps chat-intake inactivity sweeper.

Finds briefs with no meaningful user activity for INACTIVITY_THRESHOLD.
For each inactive brief:
  - If LLM-ready and has prior enrichment → send full LLM-enriched email
  - Otherwise → send transcript-only email (no LLM call)
Idempotent: never double-sends for the same (brief_id, latest_message_ts).
"""
from __future__ import annotations

import base64
import json
import logging
import sys
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

# Tune these in one place
INACTIVITY_THRESHOLD = timedelta(hours=1)

# How often the timer fires (for logging context)
SCHEDULE_INTERVAL = timedelta(minutes=15)

# Resend
RESEND_ENDPOINT = 'https://api.resend.com/emails'
RESEND_SENDER = 'ForgingApps <hello@forgingapps.com>'
EMAIL_RECIPIENT = 'hello@forgingapps.com'


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def utc_now_iso() -> str:
    return utc_now().isoformat().replace('+00:00', 'Z')


def resolve_resend_api_key() -> str | None:
    import os
    env_value = str(os.environ.get('RESEND_API_KEY') or '').strip()
    if env_value:
        return env_value
    candidates = [
        Path('/opt/forgingapps/chat-intake/.env'),
        Path('/home/alpharius/projects/forgingapps-website/.env'),
        Path('/home/alpharius/projects/forgingapps-website/.env.local'),
    ]
    for path in candidates:
        if not path.exists():
            continue
        for line in path.read_text(encoding='utf-8', errors='ignore').splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith('#'):
                continue
            if stripped.startswith('RESEND_API_KEY='):
                val = stripped.partition('=')[2].strip().strip('"').strip("'")
                if val:
                    return val
    return None


# ── DB helpers (imported from app.db, avoid relative imports in tools/) ──────────

def connect_to_db() -> sqlite3.Connection:
    import sqlite3
    path = Path('/opt/forgingapps/db/briefs.db')
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA foreign_keys = ON')
    return conn


def get_inactive_briefs(threshold: datetime) -> list[dict]:
    """Briefs whose latest message is older than threshold,
    and have not had sweep_sent_at updated since that message."""
    with connect_to_db() as conn:
        cutoff_iso = threshold.isoformat()
        rows = conn.execute(
            '''
            SELECT DISTINCT cm.brief_id, MAX(cm.created_at) AS last_msg_at
            FROM chat_messages cm
            WHERE NOT EXISTS (
                SELECT 1 FROM brief_enrichments be
                WHERE be.brief_id = cm.brief_id
                AND be.sweep_sent_at IS NOT NULL
                AND be.sweep_sent_at >= cm.created_at
            )
            GROUP BY cm.brief_id
            HAVING MAX(cm.created_at) < ?
            ''',
            (cutoff_iso,),
        ).fetchall()
        return [dict(row) for row in rows]


def get_brief_session(brief_id: str) -> dict | None:
    with connect_to_db() as conn:
        row = conn.execute(
            'SELECT id, sid, first_name, email, project, locale, created_at FROM briefs WHERE id = ?',
            (brief_id,),
        ).fetchone()
        return dict(row) if row else None


def get_chat_messages(brief_id: str) -> list[dict]:
    with connect_to_db() as conn:
        rows = conn.execute(
            'SELECT role, content, created_at FROM chat_messages WHERE brief_id = ? ORDER BY created_at ASC, id ASC',
            (brief_id,),
        ).fetchall()
        return [dict(row) for row in rows]


def get_brief_enrichment(brief_id: str) -> dict | None:
    with connect_to_db() as conn:
        row = conn.execute(
            'SELECT summary_json, finalized_at, enrichment_revision FROM brief_enrichments WHERE brief_id = ?',
            (brief_id,),
        ).fetchone()
        return dict(row) if row else None


def upsert_sweep_sent(brief_id: str, swept_at: str, finalized_at: str | None, locale: str) -> None:
    with connect_to_db() as conn:
        existing = conn.execute(
            'SELECT id FROM brief_enrichments WHERE brief_id = ?', (brief_id,)
        ).fetchone()
        if existing:
            conn.execute(
                'UPDATE brief_enrichments SET sweep_sent_at = ? WHERE brief_id = ?',
                (swept_at, brief_id),
            )
        else:
            # Bootstrap minimal enrichment record so next sweep skips this brief
            conn.execute(
                '''INSERT INTO brief_enrichments
                   (brief_id, summary_json, locale, created_at, finalized_at, enrichment_revision, sweep_sent_at)
                   VALUES (?, ?, ?, ?, ?, 0, ?)''',
                (
                    brief_id,
                    json.dumps({'brief_id': brief_id, 'project': 'N/A'}),
                    locale or 'en',
                    swept_at,
                    finalized_at,
                    swept_at,
                ),
            )
        conn.commit()


def upsert_finalized_enrichment(
    *,
    brief_id: str,
    summary: dict,
    locale: str,
    finalized_at: str,
    email_sent_at: str | None,
    email_recipient: str,
    email_error: str | None,
    enrichment_revision: int,
    sweep_sent_at: str,
) -> None:
    from app.db import upsert_brief_enrichment as _upsert
    _upsert(
        brief_id=brief_id,
        summary=summary,
        locale=locale,
        created_at=finalized_at,
        finalized_at=finalized_at,
        email_sent_at=email_sent_at,
        email_recipient=email_recipient,
        email_error=email_error,
        enrichment_revision=enrichment_revision,
    )
    # Also stamp sweep_sent_at
    with connect_to_db() as conn:
        conn.execute(
            'UPDATE brief_enrichments SET sweep_sent_at = ? WHERE brief_id = ?',
            (sweep_sent_at, brief_id),
        )
        conn.commit()


def last_assistant_signals_ready(brief_id: str) -> bool:
    """Check if the most recent assistant message contains [CINDER_READY] or closure phrases."""
    import re
    READY_MARKER_RE = re.compile(r'\s*\[CINDER_READY\]\s*\Z')
    CLOSURE_RE = re.compile(
        r'(?ix)hand|leave|ready|send.*summary|enough.*context|move.*founders|около.*полезен'
    )
    messages = get_chat_messages(brief_id)
    for msg in reversed(messages):
        if msg['role'] == 'assistant':
            content = str(msg['content'] or '').strip()
            if READY_MARKER_RE.search(content) or CLOSURE_RE.search(content):
                return True
    return False


def render_transcript_html(brief_id: str, messages: list[dict], locale: str) -> str:
    locale_label = 'English' if locale == 'en' else 'Bulgarian'
    chat_url = f'https://forgingapps.com/{locale}/brief-received?id={brief_id}'
    lines = [
        f'<h2 style="color:#ece7de;font-family:Georgia,serif;">Brief {brief_id} — partial transcript</h2>',
        f'<p style="color:#a8a39b;font-size:14px;">Language: {locale_label} · '
        f'<a href="{chat_url}" style="color:#c4a062;">Open conversation →</a></p>',
        '<hr style="border-color:rgba(196,160,98,.16);"/>',
    ]
    for msg in messages:
        role_label = 'Visitor' if msg['role'] == 'user' else 'Cinder'
        lines.append(
            f'<p style="font-size:14px;line-height:1.65;color:#ece7de;margin:6px 0;">'
            f'<strong style="color:#c4a062;">{role_label}:</strong> {msg["content"]}</p>'
        )
    lines.append(
        f'<p style="font-size:12px;color:#7f7a72;margin-top:20px;">'
        f'<a href="{chat_url}" style="color:#c4a062;">Open the conversation →</a> · '
        f'Swept {utc_now_iso()} · Cinder intake · ForgingApps</p>'
    )
    return '\n'.join(lines)


def render_transcript_markdown(brief_id: str, messages: list[dict], locale: str) -> str:
    locale_label = 'English' if locale == 'en' else 'Bulgarian'
    chat_url = f'https://forgingapps.com/{locale}/brief-received?id={brief_id}'
    lines = [
        f'# Brief {brief_id} — Partial Transcript',
        f'**Language:** {locale_label}',
        f'**Chat URL:** {chat_url}',
        '',
    ]
    for msg in messages:
        role_label = 'Visitor' if msg['role'] == 'user' else 'Cinder'
        lines.append(f'**{role_label}:** {msg["content"]}')
        lines.append('')
    lines.append(f'— Swept {utc_now_iso()} · Cinder intake · ForgingApps')
    return '\n'.join(lines)


def send_transcript_email(*, api_key: str, brief_id: str, messages: list[dict], locale: str) -> dict:
    subject = f'Abandoned brief {brief_id} — partial transcript'
    html = render_transcript_html(brief_id, messages, locale)
    md = render_transcript_markdown(brief_id, messages, locale)
    encoded = base64.b64encode(md.encode('utf-8')).decode('ascii')
    payload = {
        'from': RESEND_SENDER,
        'to': [EMAIL_RECIPIENT],
        'subject': subject,
        'html': html,
        'attachments': [
            {
                'content': encoded,
                'filename': f'transcript-{brief_id}.md',
                'type': 'text/markdown',
            }
        ],
    }
    req = urllib.request.Request(
        RESEND_ENDPOINT,
        data=json.dumps(payload).encode(),
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return {'emailed': True, 'error': None, 'status_code': resp.status}
    except Exception as exc:
        return {'emailed': False, 'error': str(exc), 'status_code': None}


def call_finalize_model_for_brief(brief_id: str, session_data: dict, messages: list[dict], locale: str) -> dict:
    """Build a FinalizeRequest and call the existing LLM finalize path."""
    sys.path.insert(0, str(Path(__file__).parent.parent / 'app'))
    from app.services import call_finalize_model
    from app.routes.chat import FinalizeRequest, build_finalize_input

    # Reconstruct a minimal session object
    class _Session:
        firstName: str
        locale: str
        brief_id: str
        def model_dump(self):
            return {
                'firstName': self.firstName,
                'locale': self.locale,
                'brief_id': self.brief_id,
            }

    sess = _Session()
    sess.firstName = session_data.get('first_name', 'Unknown')
    sess.locale = locale
    sess.brief_id = brief_id

    class _Turn:
        role: str
        content: str
        def __init__(self, role, content):
            self.role = role
            self.content = content
        def model_dump(self):
            return {'role': self.role, 'content': self.content}

    history = [_Turn(m['role'], m['content']) for m in messages]

    req = FinalizeRequest(session=sess, history=history, brief_id=brief_id, locale=locale)
    return call_finalize_model(request=req, locale=locale)


def run_sweep() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)-8s %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
    )
    log = logging.getLogger('sweep')

    api_key = resolve_resend_api_key()
    if not api_key:
        log.error('RESEND_API_KEY not found — transcript emails will be logged only')
        api_key = None

    threshold = utc_now() - INACTIVITY_THRESHOLD
    inactive_briefs = get_inactive_briefs(threshold)
    log.info('Sweep run — threshold=%s — found %d inactive briefs', INACTIVITY_THRESHOLD, len(inactive_briefs))

    if not inactive_briefs:
        log.info('No inactive briefs to process')
        return

    for entry in inactive_briefs:
        brief_id = entry['brief_id']
        last_msg_at = entry['last_msg_at']
        session_data = get_brief_session(brief_id)
        if not session_data:
            log.warning('Brief %s not found in briefs table — skipping', brief_id)
            continue

        messages = get_chat_messages(brief_id)
        if not messages:
            log.info('Brief %s has no messages — skipping', brief_id)
            continue

        locale = session_data.get('locale', 'en')
        enrichment = get_brief_enrichment(brief_id)
        signals_ready = last_assistant_signals_ready(brief_id)
        now_iso = utc_now_iso()

        if enrichment and enrichment['finalized_at'] and signals_ready:
            # Full LLM-enriched send
            log.info('Brief %s: LLM-enriched path (has enrichment + ready signal)', brief_id)
            try:
                summary = call_finalize_model_for_brief(
                    brief_id, session_data, messages, locale
                )
                summary.setdefault('brief_id', brief_id)
                summary.setdefault('contact_name', session_data.get('first_name', 'Unknown'))
                summary.setdefault('project', session_data.get('project', 'N/A'))

                # Render HTML + markdown
                from app.routes.chat import render_email_template, render_markdown_summary
                subject, html = render_email_template(summary)
                revision = (enrichment.get('enrichment_revision') or 0) + 1
                markdown_body = render_markdown_summary(summary, locale)

                if api_key:
                    from app.routes.chat import send_summary_email_with_attachment
                    email_result = send_summary_email_with_attachment(
                        api_key=api_key,
                        recipient=EMAIL_RECIPIENT,
                        subject=subject,
                        html=html,
                        markdown_content=markdown_body,
                        attachment_filename=f'summary-{brief_id}.md',
                    )
                else:
                    log.error('EMAIL WOULD BE SENT TO %s', EMAIL_RECIPIENT)
                    email_result = {'emailed': False, 'error': 'resend_api_key_missing'}

                upsert_finalized_enrichment(
                    brief_id=brief_id,
                    summary=summary,
                    locale=locale,
                    finalized_at=now_iso,
                    email_sent_at=now_iso if email_result['emailed'] else None,
                    email_recipient=EMAIL_RECIPIENT,
                    email_error=email_result['error'],
                    enrichment_revision=revision,
                    sweep_sent_at=now_iso,
                )
                log.info('Brief %s: LLM-enriched email sent (revision=%d)', brief_id, revision)
            except Exception as exc:
                log.error('Brief %s: LLM finalize failed — %s', brief_id, exc)
                # Fall through to transcript-only as fallback
                _send_transcript_only(brief_id, messages, locale, now_iso, api_key, log)
        else:
            # Transcript-only path
            _send_transcript_only(brief_id, messages, locale, now_iso, api_key, log)

    log.info('Sweep run complete')


def _send_transcript_only(brief_id, messages, locale, now_iso, api_key, log):
    log.info('Brief %s: transcript-only path', brief_id)
    if api_key:
        email_result = send_transcript_email(
            api_key=api_key, brief_id=brief_id, messages=messages, locale=locale
        )
    else:
        log.error('EMAIL WOULD BE SENT TO %s (transcript-only)', EMAIL_RECIPIENT)
        email_result = {'emailed': False, 'error': 'resend_api_key_missing'}
    upsert_sweep_sent(brief_id, now_iso, None, locale)
    log.info('Brief %s: transcript email result=%s', brief_id, email_result)


if __name__ == '__main__':
    run_sweep()
