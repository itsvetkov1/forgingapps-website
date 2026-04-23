from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
import re
from uuid import uuid4

from app.db import init_schema, resolve_intakes_dir, upsert_brief


ALLOWED_LOCALES = {'en', 'bg'}
SID_PATTERN = re.compile(r'^intake-[a-f0-9]{32}$')


def default_created_at() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace('+00:00', 'Z')



def normalize_locale(value: str) -> str:
    locale = str(value or '').strip().lower()
    return 'bg' if locale == 'bg' else 'en'



def generate_sid() -> str:
    return f'intake-{uuid4().hex}'



def validate_sid(value: str) -> str:
    sid = str(value or '').strip()
    if not SID_PATTERN.fullmatch(sid):
        raise ValueError('Invalid sid')
    return sid



def persist_brief_bootstrap(
    *,
    brief_id: str,
    sid: str,
    first_name: str,
    email: str,
    project: str,
    interest: str,
    launch: str,
    locale: str,
    variant: str,
    created_at: str,
    status: str = 'open',
) -> Path:
    normalized_sid = validate_sid(sid)
    session_dir = resolve_intakes_dir() / normalized_sid
    session_dir.mkdir(parents=True, exist_ok=True)
    form_data_path = session_dir / 'form_data.json'
    form_data_path.write_text(
        json.dumps(
            {
                'brief_id': brief_id,
                'sid': normalized_sid,
                'firstName': first_name,
                'email': email,
                'project': project,
                'interest': interest,
                'launch': launch,
                'locale': normalize_locale(locale),
                'variant': variant,
                'createdAt': created_at,
            },
            indent=2,
        )
        + '\n',
        encoding='utf-8',
    )

    try:
        init_schema()
        upsert_brief(
            {
                'id': brief_id,
                'sid': normalized_sid,
                'first_name': first_name,
                'email': email,
                'project': project,
                'interest': interest,
                'launch': launch,
                'variant': variant,
                'locale': normalize_locale(locale),
                'status': status,
                'created_at': created_at,
            }
        )
    except Exception:
        form_data_path.unlink(missing_ok=True)
        try:
            session_dir.rmdir()
        except OSError:
            pass
        raise

    return form_data_path
