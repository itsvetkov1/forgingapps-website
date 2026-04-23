from pathlib import Path

from fastapi.testclient import TestClient

import app.db as db
from app.main import app


client = TestClient(app)


def configure_temp_db(tmp_path: Path, monkeypatch) -> Path:
    temp_db = tmp_path / 'briefs.db'
    monkeypatch.setattr(db, 'DB_PATH', temp_db)
    db.init_schema()
    return temp_db


def test_get_brief_returns_404_for_unknown_id(tmp_path: Path, monkeypatch) -> None:
    configure_temp_db(tmp_path, monkeypatch)

    response = client.get('/intake/brief/FA-2604-MISSING', headers={'Origin': 'https://forgingapps.com'})

    assert response.status_code == 404
    assert response.json() == {'detail': 'Brief not found.'}
    assert response.headers['access-control-allow-origin'] == 'https://forgingapps.com'


def test_get_brief_returns_metadata_for_known_id(tmp_path: Path, monkeypatch) -> None:
    configure_temp_db(tmp_path, monkeypatch)

    with db.connect() as connection:
        connection.execute(
            '''
            INSERT INTO briefs (id, sid, first_name, email, project, interest, launch, variant, locale, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''',
            (
                'FA-2604-TEST',
                'sid-123',
                'Mara',
                'mara@example.com',
                'AI chatbot for customer support',
                'Founder-led scoping',
                'Next month',
                'ai-chat-assistant',
                'en',
                '2026-04-21T08:00:00Z',
            ),
        )
        connection.commit()

    response = client.get('/intake/brief/FA-2604-TEST', headers={'Origin': 'https://forgingapps.com'})

    assert response.status_code == 200
    assert response.headers['content-type'].startswith('application/json')
    assert response.headers['access-control-allow-origin'] == 'https://forgingapps.com'
    assert response.json() == {
        'id': 'FA-2604-TEST',
        'sid': 'sid-123',
        'firstName': 'Mara',
        'email': 'mara@example.com',
        'project': 'AI chatbot for customer support',
        'interest': 'Founder-led scoping',
        'launch': 'Next month',
        'locale': 'en',
        'createdAt': '2026-04-21T08:00:00Z',
    }
