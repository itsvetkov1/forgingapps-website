from fastapi.testclient import TestClient

from app.main import app
from app.tags import strip_tags


client = TestClient(app)


def test_intake_health_reports_ok() -> None:
    response = client.get("/intake/health")

    assert response.status_code == 200
    assert response.json() == {
        "ok": True,
        "service": "chat-intake",
        "scope": "intake",
    }


def test_strip_tags_keeps_known_tags_and_tracks_unknown_ones() -> None:
    parsed = strip_tags("Hello <MINIMUM_REACHED/> there <FUTURE_TAG/>")

    assert parsed.content == "Hello  there"
    assert parsed.tags == ["MINIMUM_REACHED"]
    assert parsed.unknown_tags == ["FUTURE_TAG"]
