"""Tests for sweep_inactive.py -- the inactivity sweeper tool."""
from __future__ import annotations

import importlib.util
import sqlite3
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pytest


def _utc(hours_ago: int) -> str:
    dt = datetime.now(timezone.utc) - timedelta(hours=hours_ago)
    return dt.isoformat().replace('+00:00', 'Z')


@pytest.fixture()
def test_db(tmp_path: Path) -> Path:
    db_path = tmp_path / 'briefs.db'
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = ON")
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS briefs (
            id TEXT PRIMARY KEY, sid TEXT NOT NULL, first_name TEXT, email TEXT,
            project TEXT, interest TEXT, launch TEXT, variant TEXT, locale TEXT,
            status TEXT, created_at TEXT NOT NULL, submitted_at TEXT, flags TEXT,
            completion_level TEXT
        );
        CREATE TABLE IF NOT EXISTS chat_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT, brief_id TEXT NOT NULL,
            role TEXT NOT NULL, content TEXT NOT NULL, created_at TEXT NOT NULL,
            FOREIGN KEY (brief_id) REFERENCES briefs(id)
        );
        CREATE TABLE IF NOT EXISTS brief_enrichments (
            id INTEGER PRIMARY KEY AUTOINCREMENT, brief_id TEXT NOT NULL UNIQUE,
            summary_json TEXT NOT NULL, locale TEXT, created_at TEXT NOT NULL,
            finalized_at TEXT, email_sent_at TEXT, email_recipient TEXT,
            email_error TEXT, enrichment_revision INTEGER DEFAULT 0,
            sweep_sent_at TEXT,
            FOREIGN KEY (brief_id) REFERENCES briefs(id)
        );
    """)
    conn.commit()
    conn.close()
    return db_path


@pytest.fixture()
def populated_db(test_db: Path) -> tuple[Path, dict]:
    """Returns (db_path, counters) with three briefs: inactive, recent, swept."""
    conn = sqlite3.connect(test_db)

    def insert_brief(bid):
        conn.execute(
            """INSERT OR IGNORE INTO briefs
               (id, sid, first_name, email, project, variant, locale, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
            (bid, f'sid-{bid}', 'Test', 'test@test.com', 'Test project',
             'generic', 'en', _utc(24)),
        )

    def insert_msg(bid, hours_ago, role='user'):
        conn.execute(
            'INSERT INTO chat_messages (brief_id, role, content, created_at) VALUES (?, ?, ?, ?)',
            (bid, role, f'Message {hours_ago}h ago', _utc(hours_ago)),
        )

    # Brief 1: inactive (2h old message), no enrichment → should appear
    insert_brief('FA-INACTIVE-1')
    insert_msg('FA-INACTIVE-1', hours_ago=2)

    # Brief 2: recent message (0h) → should be excluded
    insert_brief('FA-RECENT-1')
    insert_msg('FA-RECENT-1', hours_ago=0)

    # Brief 3: older message but already swept → should be excluded
    insert_brief('FA-SWEPT-1')
    insert_msg('FA-SWEPT-1', hours_ago=3)
    conn.execute(
        """INSERT INTO brief_enrichments
           (brief_id, summary_json, locale, created_at, finalized_at,
            enrichment_revision, sweep_sent_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        ('FA-SWEPT-1', '{}', 'en', _utc(5), _utc(4), 0, _utc(1)),
    )

    # Brief 4: swept long ago but new message → should re-appear
    insert_brief('FA-RESWEEP-1')
    insert_msg('FA-RESWEEP-1', hours_ago=2)
    conn.execute(
        """INSERT INTO brief_enrichments
           (brief_id, summary_json, locale, created_at, finalized_at,
            enrichment_revision, sweep_sent_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        ('FA-RESWEEP-1', '{}', 'en', _utc(10), _utc(9), 0, _utc(5)),
    )

    conn.commit()
    conn.close()
    return test_db, {}


_tools_dir = Path('/home/alpharius/projects/forgingapps-website/services/chat-intake/tools')


def _load_sweep_module():
    spec = importlib.util.spec_from_file_location('sweep_inactive', _tools_dir / 'sweep_inactive.py')
    module = importlib.util.module_from_spec(spec)  # type: ignore[arg-type]
    spec.loader.exec_module(module)  # type: ignore[union-attr]
    return module


class TestGetInactiveBriefs:
    """Tests for get_inactive_briefs() selection logic."""

    def _get_inactive(self, db_path: Path, hours: int):
        sweep = _load_sweep_module()

        def fake_connect():
            conn = sqlite3.connect(db_path)
            conn.row_factory = sqlite3.Row
            return conn

        sweep.connect_to_db = fake_connect  # type: ignore[assignment]
        threshold = datetime.now(timezone.utc) - timedelta(hours=hours)
        return sweep.get_inactive_briefs(threshold)

    def test_returns_briefs_with_no_enrichment_and_old_messages(self, populated_db, monkeypatch):
        db_path, _ = populated_db
        results = self._get_inactive(db_path, hours=1)
        brief_ids = [r['brief_id'] for r in results]

        assert 'FA-INACTIVE-1' in brief_ids
        assert 'FA-RECENT-1' not in brief_ids
        assert 'FA-SWEPT-1' not in brief_ids

    def test_excludes_briefs_with_recent_messages(self, populated_db, monkeypatch):
        db_path, _ = populated_db
        results = self._get_inactive(db_path, hours=1)
        brief_ids = [r['brief_id'] for r in results]

        assert 'FA-RECENT-1' not in brief_ids

    def test_excludes_briefs_already_swept_recently(self, populated_db, monkeypatch):
        db_path, _ = populated_db
        results = self._get_inactive(db_path, hours=1)
        brief_ids = [r['brief_id'] for r in results]

        assert 'FA-SWEPT-1' not in brief_ids

    def test_includes_brief_with_old_sweep_but_new_messages(self, populated_db, monkeypatch):
        db_path, _ = populated_db
        results = self._get_inactive(db_path, hours=1)
        brief_ids = [r['brief_id'] for r in results]

        # New message is 2h ago; sweep was 5h ago → stale sweep, re-appear
        assert 'FA-RESWEEP-1' in brief_ids

    def test_threshold_includes_only_older_messages(self, populated_db, monkeypatch):
        db_path, _ = populated_db
        # Use a 3-hour threshold — FA-INACTIVE-1 has 2h-old message (below threshold)
        results = self._get_inactive(db_path, hours=3)
        brief_ids = [r['brief_id'] for r in results]

        # FA-INACTIVE-1's message is 2h ago, not older than 3h threshold → excluded
        assert 'FA-INACTIVE-1' not in brief_ids