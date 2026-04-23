from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_intake_test_page_loads() -> None:
    response = client.get('/intake/test')

    assert response.status_code == 200
    assert 'text/html' in response.headers['content-type']
    assert '/intake/message' in response.text
    assert 'FA-2604-TEST' in response.text


def test_intake_message_rejects_unknown_model() -> None:
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


def test_intake_message_assembles_cinder_request(monkeypatch) -> None:
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
    assert captured['model'] == 'gpt-5.4'
    assert 'Cinder' in captured['instructions']
    assert captured['input_items'][0]['role'] == 'user'
    assert captured['input_items'][0]['content'].startswith('--- SESSION CONTEXT')
    assert captured['input_items'][0]['content'].endswith('What does payment look like?')
    assert captured['input_items'][-1] == {
        'role': 'user',
        'content': 'Walk me through what happens next',
    }


def test_intake_message_marks_ready_and_strips_marker(monkeypatch) -> None:
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


def test_intake_message_marks_none_for_greeting_only_reply(monkeypatch) -> None:
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
