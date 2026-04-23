from __future__ import annotations

import hmac
import os
import re
import sqlite3

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel, ValidationError

from app.brief_bootstrap import default_created_at, generate_sid, persist_brief_bootstrap, validate_sid
from app.db import get_brief

router = APIRouter(prefix='/intake', tags=['intake'])
BRIEF_ID_PATTERN = re.compile(r'^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$')
EMAIL_PATTERN = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')


class BriefResponse(BaseModel):
    id: str
    sid: str
    firstName: str
    email: str
    project: str
    interest: str
    launch: str
    locale: str
    createdAt: str


class BriefIngestPayload(BaseModel):
    brief_id: str
    firstName: str
    email: str
    project: str
    interest: str
    launch: str
    locale: str
    variant: str
    sid: str | None = None


class BriefIngestResponse(BaseModel):
    ok: bool
    brief_id: str
    sid: str


@router.get('/brief/{brief_id}', response_model=BriefResponse)
def get_brief_metadata(brief_id: str) -> BriefResponse:
    normalized_brief_id = brief_id.strip()
    if not normalized_brief_id or not BRIEF_ID_PATTERN.match(normalized_brief_id):
        raise HTTPException(status_code=404, detail='Brief not found.')

    row = get_brief(normalized_brief_id)
    if row is None:
        raise HTTPException(status_code=404, detail='Brief not found.')

    locale = 'bg' if str(row['locale'] or '').strip().lower() == 'bg' else 'en'
    return BriefResponse(
        id=str(row['id']),
        sid=str(row['sid']),
        firstName=str(row['first_name'] or ''),
        email=str(row['email'] or ''),
        project=str(row['project'] or ''),
        interest=str(row['interest'] or ''),
        launch=str(row['launch'] or ''),
        locale=locale,
        createdAt=str(row['created_at'] or ''),
    )


@router.post('/brief/ingest', response_model=BriefIngestResponse)
async def ingest_brief(
    request: Request,
    x_intake_secret: str | None = Header(default=None),
) -> BriefIngestResponse:
    expected_secret = os.getenv('INTAKE_INGEST_SECRET', '')
    if not expected_secret or not x_intake_secret or not hmac.compare_digest(x_intake_secret, expected_secret):
        raise HTTPException(status_code=401, detail='Unauthorized')

    try:
        raw_payload = await request.json()
        payload = BriefIngestPayload.model_validate(raw_payload)
    except (ValueError, ValidationError):
        raise HTTPException(status_code=400, detail='Malformed request body.') from None

    brief_id = payload.brief_id.strip()
    first_name = payload.firstName.strip()
    email = payload.email.strip()
    project = payload.project.strip()
    interest = payload.interest.strip()
    launch = payload.launch.strip()
    locale = payload.locale.strip().lower()
    variant = payload.variant.strip()
    sid = payload.sid.strip() if payload.sid else None

    if not brief_id or not BRIEF_ID_PATTERN.match(brief_id):
        raise HTTPException(status_code=400, detail='Malformed request body.')
    if not first_name or not email or not EMAIL_PATTERN.match(email):
        raise HTTPException(status_code=400, detail='Malformed request body.')
    if not project or not interest or not launch or locale not in {'en', 'bg'} or not variant:
        raise HTTPException(status_code=400, detail='Malformed request body.')
    if sid is not None:
        try:
            sid = validate_sid(sid)
        except ValueError:
            raise HTTPException(status_code=400, detail='Malformed request body.') from None

    try:
        existing = get_brief(brief_id)
    except sqlite3.Error:
        raise HTTPException(status_code=500, detail='Failed to persist brief.') from None
    resolved_sid = str(existing['sid']) if existing is not None and existing['sid'] else (sid or generate_sid())
    created_at = str(existing['created_at']) if existing is not None and existing['created_at'] else default_created_at()
    status = str(existing['status']) if existing is not None and existing['status'] else 'open'

    try:
        persist_brief_bootstrap(
            brief_id=brief_id,
            sid=resolved_sid,
            first_name=first_name,
            email=email,
            project=project,
            interest=interest,
            launch=launch,
            locale=locale,
            variant=variant,
            status=status,
            created_at=created_at,
        )
    except (OSError, ValueError, sqlite3.Error):
        raise HTTPException(status_code=500, detail='Failed to persist brief.') from None
    return BriefIngestResponse(ok=True, brief_id=brief_id, sid=resolved_sid)
