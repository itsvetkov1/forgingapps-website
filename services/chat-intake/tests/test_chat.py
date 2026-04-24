from __future__ import annotations

import importlib
import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from app.brief_bootstrap import persist_brief_bootstrap
from app.db import connect, upsert_brief_enrichment


@pytest.fixture()
def client(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> TestClient:
    prompts_dir = tmp_path / 'prompts'
    prompts_dir.mkdir(parents=True, exist_ok=True)
    (prompts_dir / 'style-guide.md').write_text('Keep replies concise and clear.', encoding='utf-8')
    (prompts_dir / 'cinder_persona.md').write_text('You are Cinder.', encoding='utf-8')
    system_dir = prompts_dir / 'system'
    system_dir.mkdir(parents=True, exist_ok=True)
    (system_dir / 'generic.md').write_text('Focus on scope, timing, and next steps.', encoding='utf-8')
    (prompts_dir / 'cinder_finalize.md').write_text('Return strict JSON only.', encoding='utf-8')
    (prompts_dir / 'email_to_team.md').write_text('Subject: Test\n\nBody', encoding='utf-8')

    monkeypatch.setenv('CHAT_INTAKE_DB_PATH', str(tmp_path / 'briefs.db'))
    monkeypatch.setenv('CHAT_INTAKE_INTAKES_DIR', str(tmp_path / 'intakes'))
    monkeypatch.setenv('CHAT_INTAKE_PROMPTS_DIR', str(prompts_dir))
    monkeypatch.setenv('ENABLE_AUTO_FINALIZE', 'false')  # Disable auto-finalize in tests

    import app.main

    importlib.reload(app.main)
    return TestClient(app.main.app)


def seed_brief(
    *,
    brief_id: str = 'FA-2604-TEST',
    first_name: str = 'Mara',
    locale: str = 'en',
    variant: str = 'generic',
) -> dict[str, str]:
    record = {
        'brief_id': brief_id,
        'sid': 'intake-11111111111111111111111111111111',
        'first_name': first_name,
        'email': 'mara@example.com',
        'project': 'AI chatbot for customer support',
        'interest': 'Lead qualification and FAQ automation',
        'launch': 'Within 6 weeks',
        'locale': locale,
        'variant': variant,
        'created_at': '2026-04-23T09:00:00Z',
    }
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
    return record


def test_intake_test_page_loads(client: TestClient) -> None:
    response = client.get('/intake/test')

    assert response.status_code == 200
    assert 'text/html' in response.headers['content-type']
    assert '/intake/message' in response.text
    assert 'FA-2604-TEST' in response.text


def test_intake_message_rejects_unknown_model(client: TestClient) -> None:
    seed_brief()

    response = client.post(
        '/intake/message',
        json={
            'session': {
                'brief_id': 'FA-2604-TEST',
                'firstName': 'Mara',
                'topic': 'AI chatbot for customer support',
                'locale': 'en',
                'variant': 'generic',
            },
            'history': [],
            'message': 'What does payment look like?',
            'model': 'gpt-secret-9000',
        },
    )

    assert response.status_code == 400
    assert response.json()['reply'] == 'Something went wrong on our end, try again in a moment.'


def test_intake_message_assembles_cinder_request(client: TestClient, monkeypatch: pytest.MonkeyPatch) -> None:
    seed_brief()
    captured = {}

    def fake_call_codex_responses(*, model, instructions, input_items):
        captured['model'] = model
        captured['instructions'] = instructions
        captured['input_items'] = input_items
        return {
            'reply': '<MINIMUM_REACHED/> Payment depends on the package, the integrations, and whether we need founder-led scoping first.',
            'usage': {'input_tokens': 10, 'output_tokens': 5, 'total_tokens': 15},
        }

    monkeypatch.setattr('app.services.call_codex_responses', fake_call_codex_responses)

    response = client.post(
        '/intake/message',
        json={
            'session': {
                'brief_id': 'FA-2604-TEST',
                'firstName': 'Mara',
                'topic': 'AI chatbot for customer support',
                'locale': 'en',
                'variant': 'generic',
            },
            'history': [
                {'role': 'user', 'content': 'What does payment look like?'},
                {'role': 'assistant', 'content': 'It depends on the package.'},
            ],
            'message': 'Walk me through what happens next',
        },
    )

    assert response.status_code == 200
    assert response.json()['reply'] == 'Payment depends on the package, the integrations, and whether we need founder-led scoping first.'
    assert response.json()['completion'] == 'partial'
    assert captured['model'] == 'gpt-5.5'
    assert 'Cinder' in captured['instructions']
    assert captured['input_items'][0]['role'] == 'user'
    assert captured['input_items'][0]['content'].startswith('--- SESSION CONTEXT')
    assert captured['input_items'][0]['content'].endswith('What does payment look like?')
    assert captured['input_items'][-1] == {
        'role': 'user',
        'content': 'Walk me through what happens next',
    }


def test_intake_message_persists_user_and_assistant_turns(client: TestClient, monkeypatch: pytest.MonkeyPatch) -> None:
    seed_brief(brief_id='FA-2604-PERSIST')

    def fake_call_codex_responses(*, model, instructions, input_items):
        return {
            'reply': 'We can scope the integration and confirm the launch window next.',
            'usage': {'input_tokens': 8, 'output_tokens': 7, 'total_tokens': 15},
        }

    monkeypatch.setattr('app.services.call_codex_responses', fake_call_codex_responses)

    with connect() as connection:
        before_count = connection.execute(
            'SELECT COUNT(*) AS count FROM chat_messages WHERE brief_id = ?',
            ('FA-2604-PERSIST',),
        ).fetchone()['count']

    response = client.post(
        '/intake/message',
        json={
            'session': {
                'brief_id': 'FA-2604-PERSIST',
                'firstName': 'Mara',
                'topic': 'AI chatbot for customer support',
                'locale': 'en',
                'variant': 'generic',
            },
            'history': [],
            'message': 'Can you map the next step?',
        },
    )

    assert response.status_code == 200

    with connect() as connection:
        rows = connection.execute(
            'SELECT role, content, created_at FROM chat_messages WHERE brief_id = ? ORDER BY id ASC',
            ('FA-2604-PERSIST',),
        ).fetchall()

    assert len(rows) == before_count + 2
    assert rows[-2]['role'] == 'user'
    assert rows[-2]['content'] == 'Can you map the next step?'
    assert rows[-1]['role'] == 'assistant'
    assert rows[-1]['content'] == 'We can scope the integration and confirm the launch window next.'
    assert rows[-2]['created_at'].endswith('Z')
    assert rows[-1]['created_at'].endswith('Z')


def test_intake_message_marks_ready_and_strips_marker(client: TestClient, monkeypatch: pytest.MonkeyPatch) -> None:
    seed_brief()

    def fake_call_codex_responses(*, model, instructions, input_items):
        return {
            'reply': 'That gives Ivaylo enough to prep the call. We can wrap here. [CINDER_READY]   ',
            'usage': {'input_tokens': 12, 'output_tokens': 9, 'total_tokens': 21},
        }

    monkeypatch.setattr('app.services.call_codex_responses', fake_call_codex_responses)

    response = client.post(
        '/intake/message',
        json={
            'session': {
                'brief_id': 'FA-2604-TEST',
                'firstName': 'Mara',
                'topic': 'AI chatbot for customer support',
                'locale': 'en',
                'variant': 'generic',
            },
            'history': [],
            'message': 'Ok, let us do it. Budget is approved and I am the decision maker.',
        },
    )

    assert response.status_code == 200
    assert response.json()['completion'] == 'ready'
    assert response.json()['reply'] == 'That gives Ivaylo enough to prep the call. We can wrap here.'
    assert '[CINDER_READY]' not in response.json()['reply']


def test_intake_message_marks_none_for_greeting_only_reply(client: TestClient, monkeypatch: pytest.MonkeyPatch) -> None:
    seed_brief()

    def fake_call_codex_responses(*, model, instructions, input_items):
        return {
            'reply': 'Hi Mara — happy to help.',
            'usage': {'input_tokens': 8, 'output_tokens': 4, 'total_tokens': 12},
        }

    monkeypatch.setattr('app.services.call_codex_responses', fake_call_codex_responses)

    response = client.post(
        '/intake/message',
        json={
            'session': {
                'brief_id': 'FA-2604-TEST',
                'firstName': 'Mara',
                'topic': 'AI chatbot for customer support',
                'locale': 'en',
                'variant': 'generic',
            },
            'history': [],
            'message': 'Hello',
        },
    )

    assert response.status_code == 200
    assert response.json()['completion'] == 'none'
    assert response.json()['reply'] == 'Hi Mara — happy to help.'


def test_get_brief_messages_returns_history_and_finalize_preview(client: TestClient) -> None:
    record = seed_brief(brief_id='FA-2604-HISTORY')

    with connect() as connection:
        connection.execute(
            'INSERT INTO chat_messages (brief_id, role, content, created_at) VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
            (
                record['brief_id'],
                'user',
                'We need an assistant for support.',
                '2026-04-23T10:00:00Z',
                record['brief_id'],
                'assistant',
                'Got it — what timeline are you targeting?',
                '2026-04-23T10:00:01Z',
            ),
        )
        connection.commit()

    upsert_brief_enrichment(
        brief_id=record['brief_id'],
        summary={
            'project': 'Support assistant rollout',
            'timing': 'Within 6 weeks',
            'next_step': 'Founder follow-up call',
            'scope_summary': 'Web assistant with FAQ and lead routing',
        },
        locale='en',
        created_at='2026-04-23T10:05:00Z',
        finalized_at='2026-04-23T10:06:00Z',
        email_sent_at='2026-04-23T10:06:00Z',
        email_recipient='hello@forgingapps.com',
        email_error=None,
    )

    response = client.get(f"/intake/brief/{record['brief_id']}/messages")

    assert response.status_code == 200
    assert response.json() == {
        'brief_id': 'FA-2604-HISTORY',
        'messages': [
            {
                'role': 'user',
                'content': 'We need an assistant for support.',
                'created_at': '2026-04-23T10:00:00Z',
            },
            {
                'role': 'assistant',
                'content': 'Got it — what timeline are you targeting?',
                'created_at': '2026-04-23T10:00:01Z',
            },
        ],
        'finalized': True,
        'finalized_at': '2026-04-23T10:06:00Z',
        'summary_preview': {
            'project': 'Support assistant rollout',
            'timing': 'Within 6 weeks',
            'next_step': 'Founder follow-up call',
        },
    }


def test_get_brief_messages_returns_empty_history_for_unfinalized_brief(client: TestClient) -> None:
    record = seed_brief(brief_id='FA-2604-EMPTY')

    response = client.get(f"/intake/brief/{record['brief_id']}/messages")

    assert response.status_code == 200
    assert response.json() == {
        'brief_id': 'FA-2604-EMPTY',
        'messages': [],
        'finalized': False,
        'finalized_at': None,
        'summary_preview': None,
    }


def test_get_brief_messages_returns_404_for_unknown_brief(client: TestClient) -> None:
    response = client.get('/intake/brief/FA-UNKNOWN/messages')

    assert response.status_code == 404
    assert response.json() == {'detail': 'Brief not found.'}
