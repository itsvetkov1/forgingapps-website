from __future__ import annotations

import importlib
import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.brief_bootstrap import persist_brief_bootstrap
from app.db import connect


@pytest.fixture()
def client(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> TestClient:
    prompts_dir = tmp_path / 'prompts'
    prompts_dir.mkdir(parents=True, exist_ok=True)
    (prompts_dir / 'cinder_finalize.md').write_text('Return strict JSON only.', encoding='utf-8')
    (prompts_dir / 'email_to_team.md').write_text(
        'Subject: New brief {{brief_id}} for {{company_name}}\n\n'
        'Company: {{company_name}}\n'
        'Contact: {{contact_name}}\n'
        'Need: {{project_summary}}\n',
        encoding='utf-8',
    )

    monkeypatch.setenv('CHAT_INTAKE_DB_PATH', str(tmp_path / 'briefs.db'))
    monkeypatch.setenv('CHAT_INTAKE_INTAKES_DIR', str(tmp_path / 'intakes'))
    monkeypatch.setenv('CHAT_INTAKE_PROMPTS_DIR', str(prompts_dir))
    monkeypatch.setenv('RESEND_API_KEY', 'test-resend-key')
    monkeypatch.setenv('ENABLE_AUTO_FINALIZE', 'false')

    import app.main

    importlib.reload(app.main)
    return TestClient(app.main.app)


@pytest.fixture()
def seeded_brief() -> dict[str, str]:
    return {
        'brief_id': 'FA-2604-FINAL',
        'sid': 'intake-11111111111111111111111111111111',
        'first_name': 'Mara',
        'email': 'mara@example.com',
        'project': 'AI chatbot for customer support',
        'interest': 'Lead qualification and FAQ automation',
        'launch': 'Within 6 weeks',
        'locale': 'en',
        'variant': 'ai-chat-assistant',
        'created_at': '2026-04-23T09:00:00Z',
    }


@pytest.fixture()
def history() -> list[dict[str, str]]:
    return [
        {'role': 'assistant', 'content': 'Tell me about the project.'},
        {'role': 'user', 'content': 'We want an FAQ and lead-qualification chatbot for our website.'},
        {'role': 'assistant', 'content': 'What timeline are you working toward?'},
        {'role': 'user', 'content': 'We want to launch in six weeks and I can approve the budget.'},
    ]


def _seed_brief(record: dict[str, str]) -> None:
    persist_brief_bootstrap(
        brief_id=record['brief_id'],
        sid=record['sid'],
        first_name=record['first_name'],
        email=record['email'],
        project=record['project'],
        interest=record['interest'],
        launch=record['launch'],
        locale=record['locale'],
        variant=record['variant'],
        created_at=record['created_at'],
    )


def test_finalize_persists_summary_and_emails_team(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
    seeded_brief: dict[str, str],
    history: list[dict[str, str]],
) -> None:
    _seed_brief(seeded_brief)
    sent = {}

    def fake_call_codex_responses(*, model, instructions, input_items):
        assert model == 'gpt-5.5'
        assert 'Return strict JSON only.' in instructions
        assert input_items[-1]['role'] == 'user'
        return {
            'reply': json.dumps(
                {
                    'brief_id': seeded_brief['brief_id'],
                    'company_name': 'Acme Health',
                    'contact_name': 'Mara',
                    'project_summary': 'AI chatbot for customer support',
                }
            ),
            'usage': {'input_tokens': 25, 'output_tokens': 12, 'total_tokens': 37},
        }

    def fake_send_summary_email(*, api_key, recipient, subject, html):
        sent['api_key'] = api_key
        sent['recipient'] = recipient
        sent['subject'] = subject
        sent['html'] = html
        return {'emailed': True, 'error': None}

    monkeypatch.setattr('app.routes.chat.call_codex_responses', fake_call_codex_responses)
    monkeypatch.setattr('app.routes.chat.send_summary_email', fake_send_summary_email)

    response = client.post(
        '/intake/finalize',
        json={
            'session': {
                'brief_id': seeded_brief['brief_id'],
                'firstName': seeded_brief['first_name'],
                'topic': seeded_brief['project'],
                'locale': seeded_brief['locale'],
                'variant': seeded_brief['variant'],
            },
            'history': history,
            'brief_id': seeded_brief['brief_id'],
            'locale': 'en',
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        'summary': {
            'brief_id': seeded_brief['brief_id'],
            'company_name': 'Acme Health',
            'contact_name': 'Mara',
            'project_summary': 'AI chatbot for customer support',
        },
        'emailed': True,
        'error': None,
    }
    assert sent['api_key'] == 'test-resend-key'
    assert sent['recipient'] == 'hello@forgingapps.com'
    assert sent['subject'] == 'New brief FA-2604-FINAL for Acme Health'
    assert 'Company: Acme Health' in sent['html']

    with connect() as connection:
        row = connection.execute(
            'SELECT brief_id, summary_json, email_sent_at, email_recipient, email_error FROM brief_enrichments WHERE brief_id = ?',
            (seeded_brief['brief_id'],),
        ).fetchone()

    assert row is not None
    assert row['brief_id'] == seeded_brief['brief_id']
    assert json.loads(row['summary_json']) == response.json()['summary']
    assert row['email_sent_at']
    assert row['email_recipient'] == 'hello@forgingapps.com'
    assert row['email_error'] in (None, '')


def test_finalize_retries_once_when_first_reply_is_not_json(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
    seeded_brief: dict[str, str],
    history: list[dict[str, str]],
) -> None:
    _seed_brief(seeded_brief)
    calls: list[list[dict[str, str]]] = []

    def fake_call_codex_responses(*, model, instructions, input_items):
        calls.append(input_items)
        if len(calls) == 1:
            return {'reply': 'not json at all', 'usage': {}}
        return {
            'reply': json.dumps(
                {
                    'brief_id': seeded_brief['brief_id'],
                    'company_name': 'Retry Co',
                    'contact_name': 'Mara',
                    'project_summary': 'Recovered on retry',
                }
            ),
            'usage': {},
        }

    monkeypatch.setattr('app.routes.chat.call_codex_responses', fake_call_codex_responses)
    monkeypatch.setattr(
        'app.routes.chat.send_summary_email',
        lambda **kwargs: {'emailed': True, 'error': None},
    )

    response = client.post(
        '/intake/finalize',
        json={
            'session': {
                'brief_id': seeded_brief['brief_id'],
                'firstName': seeded_brief['first_name'],
                'topic': seeded_brief['project'],
                'locale': seeded_brief['locale'],
                'variant': seeded_brief['variant'],
            },
            'history': history,
            'brief_id': seeded_brief['brief_id'],
        },
    )

    assert response.status_code == 200
    assert response.json()['summary']['company_name'] == 'Retry Co'
    assert len(calls) == 2
    assert 'Your previous reply was not valid JSON.' in calls[1][-1]['content']


def test_finalize_returns_502_when_json_parse_fails_twice(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
    seeded_brief: dict[str, str],
    history: list[dict[str, str]],
) -> None:
    _seed_brief(seeded_brief)

    monkeypatch.setattr(
        'app.routes.chat.call_codex_responses',
        lambda **kwargs: {'reply': 'still not json', 'usage': {}},
    )

    response = client.post(
        '/intake/finalize',
        json={
            'session': {
                'brief_id': seeded_brief['brief_id'],
                'firstName': seeded_brief['first_name'],
                'topic': seeded_brief['project'],
                'locale': seeded_brief['locale'],
                'variant': seeded_brief['variant'],
            },
            'history': history,
            'brief_id': seeded_brief['brief_id'],
        },
    )

    assert response.status_code == 502
    assert response.json() == {'error': 'summary_parse_failed', 'raw': 'still not json'}

    with connect() as connection:
        row = connection.execute(
            'SELECT brief_id FROM brief_enrichments WHERE brief_id = ?',
            (seeded_brief['brief_id'],),
        ).fetchone()

    assert row is None


def test_finalize_returns_200_and_keeps_retryable_state_when_email_send_fails(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
    seeded_brief: dict[str, str],
    history: list[dict[str, str]],
) -> None:
    _seed_brief(seeded_brief)

    monkeypatch.setattr(
        'app.routes.chat.call_codex_responses',
        lambda **kwargs: {
            'reply': json.dumps(
                {
                    'brief_id': seeded_brief['brief_id'],
                    'company_name': 'Email Fail LLC',
                    'contact_name': 'Mara',
                    'project_summary': 'Summary still persists',
                }
            ),
            'usage': {},
        },
    )

    def fake_send_summary_email(**kwargs):
        return {'emailed': False, 'error': 'resend_401'}

    monkeypatch.setattr('app.routes.chat.send_summary_email', fake_send_summary_email)

    response = client.post(
        '/intake/finalize',
        json={
            'session': {
                'brief_id': seeded_brief['brief_id'],
                'firstName': seeded_brief['first_name'],
                'topic': seeded_brief['project'],
                'locale': seeded_brief['locale'],
                'variant': seeded_brief['variant'],
            },
            'history': history,
            'brief_id': seeded_brief['brief_id'],
        },
    )

    assert response.status_code == 200
    assert response.json()['emailed'] is False
    assert response.json()['error'] == 'resend_401'

    with connect() as connection:
        row = connection.execute(
            'SELECT email_sent_at, email_error FROM brief_enrichments WHERE brief_id = ?',
            (seeded_brief['brief_id'],),
        ).fetchone()

    assert row is not None
    assert row['email_sent_at'] is None
    assert row['email_error'] == 'resend_401'


def test_finalize_uses_noop_sender_when_resend_key_missing(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
    seeded_brief: dict[str, str],
    history: list[dict[str, str]],
) -> None:
    _seed_brief(seeded_brief)
    monkeypatch.setattr('app.routes.chat.resolve_resend_api_key', lambda: None)

    monkeypatch.setattr(
        'app.routes.chat.call_codex_responses',
        lambda **kwargs: {
            'reply': json.dumps(
                {
                    'brief_id': seeded_brief['brief_id'],
                    'company_name': 'No Key Inc',
                    'contact_name': 'Mara',
                    'project_summary': 'Still testable without SMTP',
                }
            ),
            'usage': {},
        },
    )

    response = client.post(
        '/intake/finalize',
        json={
            'session': {
                'brief_id': seeded_brief['brief_id'],
                'firstName': seeded_brief['first_name'],
                'topic': seeded_brief['project'],
                'locale': seeded_brief['locale'],
                'variant': seeded_brief['variant'],
            },
            'history': history,
            'brief_id': seeded_brief['brief_id'],
        },
    )

    assert response.status_code == 200
    assert response.json()['emailed'] is False
    assert response.json()['error'] == 'resend_api_key_missing'
