from __future__ import annotations

import importlib
import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.brief_bootstrap import persist_brief_bootstrap
from app.db import get_brief


@pytest.fixture()
def client(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> TestClient:
    monkeypatch.setenv('CHAT_INTAKE_DB_PATH', str(tmp_path / 'briefs.db'))
    monkeypatch.setenv('CHAT_INTAKE_INTAKES_DIR', str(tmp_path / 'intakes'))
    monkeypatch.setenv('INTAKE_INGEST_SECRET', 'test-intake-secret')

    import app.main

    importlib.reload(app.main)
    return TestClient(app.main.app)


@pytest.fixture()
def auth_headers() -> dict[str, str]:
    return {'X-Intake-Secret': 'test-intake-secret'}


@pytest.fixture()
def payload() -> dict[str, str]:
    return {
        'brief_id': 'FA-2604-INGEST',
        'firstName': 'Mara',
        'email': 'mara@example.com',
        'project': 'AI chatbot for customer support',
        'interest': 'Lead qualification and FAQ automation',
        'launch': 'Within 6 weeks',
        'locale': 'en',
        'variant': 'ai-chat-assistant',
    }


def test_brief_ingest_rejects_missing_or_wrong_secret(client: TestClient, payload: dict[str, str]) -> None:
    missing = client.post('/intake/brief/ingest', json=payload)
    wrong = client.post('/intake/brief/ingest', json=payload, headers={'X-Intake-Secret': 'wrong-secret'})

    assert missing.status_code == 401
    assert wrong.status_code == 401
    assert missing.json()['detail'] == 'Unauthorized'
    assert wrong.json()['detail'] == 'Unauthorized'



def test_brief_ingest_creates_row_and_form_data(
    client: TestClient,
    auth_headers: dict[str, str],
    payload: dict[str, str],
    tmp_path: Path,
) -> None:
    response = client.post('/intake/brief/ingest', json=payload, headers=auth_headers)

    assert response.status_code == 200
    body = response.json()
    assert body['ok'] is True
    assert body['brief_id'] == payload['brief_id']
    assert body['sid']

    row = get_brief(payload['brief_id'])
    assert row is not None
    assert row['sid'] == body['sid']
    assert row['first_name'] == payload['firstName']
    assert row['email'] == payload['email']
    assert row['variant'] == payload['variant']

    intakes_dir = tmp_path / 'intakes'
    form_data = json.loads((intakes_dir / body['sid'] / 'form_data.json').read_text(encoding='utf-8'))
    assert form_data == {
        'brief_id': payload['brief_id'],
        'sid': body['sid'],
        'firstName': payload['firstName'],
        'email': payload['email'],
        'project': payload['project'],
        'interest': payload['interest'],
        'launch': payload['launch'],
        'locale': payload['locale'],
        'variant': payload['variant'],
        'createdAt': form_data['createdAt'],
    }



def test_brief_ingest_upserts_existing_brief_and_reuses_sid(
    client: TestClient,
    auth_headers: dict[str, str],
    payload: dict[str, str],
    tmp_path: Path,
) -> None:
    first = client.post('/intake/brief/ingest', json=payload, headers=auth_headers)
    assert first.status_code == 200

    updated_payload = {
        **payload,
        'project': 'Internal ops copilot',
        'interest': 'Knowledge search and team support',
        'launch': 'Q3 2026',
        'sid': 'intake-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    }
    second = client.post('/intake/brief/ingest', json=updated_payload, headers=auth_headers)

    assert second.status_code == 200
    assert second.json()['sid'] == first.json()['sid']

    row = get_brief(payload['brief_id'])
    assert row is not None
    assert row['sid'] == first.json()['sid']
    assert row['project'] == 'Internal ops copilot'
    assert row['interest'] == 'Knowledge search and team support'
    assert row['launch'] == 'Q3 2026'

    intakes_dir = tmp_path / 'intakes'
    form_data = json.loads((intakes_dir / first.json()['sid'] / 'form_data.json').read_text(encoding='utf-8'))
    assert form_data['project'] == 'Internal ops copilot'
    assert form_data['interest'] == 'Knowledge search and team support'
    assert form_data['launch'] == 'Q3 2026'
    assert not (intakes_dir / 'intake-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa').exists()



def test_brief_ingest_rejects_malformed_body(
    client: TestClient,
    auth_headers: dict[str, str],
    payload: dict[str, str],
) -> None:
    malformed = {key: value for key, value in payload.items() if key != 'email'}

    response = client.post('/intake/brief/ingest', json=malformed, headers=auth_headers)

    assert response.status_code == 400
    assert response.json()['detail'] == 'Malformed request body.'



def test_brief_ingest_rejects_invalid_sid(
    client: TestClient,
    auth_headers: dict[str, str],
    payload: dict[str, str],
) -> None:
    response = client.post(
        '/intake/brief/ingest',
        json={**payload, 'sid': '../../escape'},
        headers=auth_headers,
    )

    assert response.status_code == 400
    assert response.json()['detail'] == 'Malformed request body.'



def test_brief_ingest_preserves_existing_status(
    client: TestClient,
    auth_headers: dict[str, str],
    payload: dict[str, str],
) -> None:
    persist_brief_bootstrap(
        brief_id=payload['brief_id'],
        sid='intake-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
        first_name=payload['firstName'],
        email=payload['email'],
        project=payload['project'],
        interest=payload['interest'],
        launch=payload['launch'],
        locale=payload['locale'],
        variant=payload['variant'],
        status='submitted',
        created_at='2026-04-22T00:00:00Z',
    )

    response = client.post(
        '/intake/brief/ingest',
        json={**payload, 'project': 'Updated after submit'},
        headers=auth_headers,
    )

    assert response.status_code == 200
    row = get_brief(payload['brief_id'])
    assert row is not None
    assert row['sid'] == 'intake-bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    assert row['status'] == 'submitted'
    assert row['project'] == 'Updated after submit'
