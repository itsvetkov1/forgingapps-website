"""SQLite connection and schema helpers for chat-intake."""

from __future__ import annotations

import json
import os
from pathlib import Path
import sqlite3
from typing import Any

RUNTIME_DB_PATH = Path('/opt/forgingapps/db/briefs.db')
REPO_DB_PATH = Path(__file__).resolve().parents[1] / 'briefs.db'
RUNTIME_INTAKES_DIR = Path('/opt/forgingapps/intakes')
REPO_INTAKES_DIR = Path(__file__).resolve().parents[1] / 'intakes'
DB_PATH = RUNTIME_DB_PATH

SCHEMA = """
CREATE TABLE IF NOT EXISTS briefs (
    id TEXT PRIMARY KEY,
    sid TEXT NOT NULL,
    first_name TEXT,
    email TEXT,
    project TEXT,
    interest TEXT,
    launch TEXT,
    variant TEXT,
    locale TEXT,
    status TEXT,
    created_at TEXT NOT NULL,
    submitted_at TEXT,
    flags TEXT,
    completion_level TEXT
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brief_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (brief_id) REFERENCES briefs(id)
);

CREATE TABLE IF NOT EXISTS brief_enrichments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brief_id TEXT NOT NULL UNIQUE,
    summary_json TEXT NOT NULL,
    locale TEXT,
    created_at TEXT NOT NULL,
    finalized_at TEXT,
    email_sent_at TEXT,
    email_recipient TEXT,
    email_error TEXT,
    enrichment_revision INTEGER DEFAULT 0,
    sweep_sent_at TEXT,
    FOREIGN KEY (brief_id) REFERENCES briefs(id)
);
"""


BRIEF_SELECT_COLUMNS = """
    id,
    sid,
    first_name,
    email,
    project,
    interest,
    launch,
    variant,
    locale,
    status,
    created_at
"""


def resolve_db_path() -> Path:
    override = os.getenv('CHAT_INTAKE_DB_PATH')
    if override:
        return Path(override).expanduser()
    if DB_PATH != RUNTIME_DB_PATH:
        return DB_PATH
    if RUNTIME_DB_PATH.exists() or RUNTIME_DB_PATH.parent.parent.exists():
        return RUNTIME_DB_PATH
    return REPO_DB_PATH


def resolve_intakes_dir() -> Path:
    override = os.getenv('CHAT_INTAKE_INTAKES_DIR')
    if override:
        return Path(override).expanduser()
    if RUNTIME_INTAKES_DIR.exists() or RUNTIME_INTAKES_DIR.parent.exists():
        return RUNTIME_INTAKES_DIR
    return REPO_INTAKES_DIR


def connect() -> sqlite3.Connection:
    path = resolve_db_path()
    connection = sqlite3.connect(path)
    connection.row_factory = sqlite3.Row
    connection.execute('PRAGMA foreign_keys = ON')
    return connection


def init_schema() -> Path:
    path = resolve_db_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(path) as connection:
        connection.executescript(SCHEMA)
        columns = {row[1] for row in connection.execute('PRAGMA table_info(briefs)').fetchall()}
        if 'status' not in columns:
            connection.execute('ALTER TABLE briefs ADD COLUMN status TEXT')
        enrich_cols = {row[1] for row in connection.execute('PRAGMA table_info(brief_enrichments)').fetchall()}
        if 'enrichment_revision' not in enrich_cols:
            connection.execute('ALTER TABLE brief_enrichments ADD COLUMN enrichment_revision INTEGER DEFAULT 0')
        if 'sweep_sent_at' not in enrich_cols:
            connection.execute('ALTER TABLE brief_enrichments ADD COLUMN sweep_sent_at TEXT')
        connection.commit()
    return path


def get_brief(brief_id: str):
    with connect() as connection:
        return connection.execute(
            f'''SELECT {BRIEF_SELECT_COLUMNS} FROM briefs WHERE id = ? LIMIT 1''',
            (brief_id,),
        ).fetchone()


def list_chat_messages(brief_id: str):
    with connect() as connection:
        return connection.execute(
            '''
            SELECT role, content, created_at
            FROM chat_messages
            WHERE brief_id = ?
            ORDER BY created_at ASC, id ASC
            ''',
            (brief_id,),
        ).fetchall()


def insert_chat_messages(*, brief_id: str, messages: list[dict[str, str]]) -> None:
    if not messages:
        return
    with connect() as connection:
        connection.executemany(
            'INSERT INTO chat_messages (brief_id, role, content, created_at) VALUES (?, ?, ?, ?)',
            [
                (
                    brief_id,
                    message['role'],
                    message['content'],
                    message['created_at'],
                )
                for message in messages
            ],
        )
        connection.commit()


def get_brief_enrichment(brief_id: str):
    with connect() as connection:
        return connection.execute(
            '''
            SELECT summary_json, finalized_at, enrichment_revision
            FROM brief_enrichments
            WHERE brief_id = ?
            LIMIT 1
            ''',
            (brief_id,),
        ).fetchone()



def get_latest_chat_message(brief_id: str):
    with connect() as connection:
        return connection.execute(
            '''
            SELECT role, content, created_at
            FROM chat_messages
            WHERE brief_id = ?
            ORDER BY created_at DESC, id DESC
            LIMIT 1
            ''',
            (brief_id,),
        ).fetchone()


def upsert_brief(record: dict[str, Any]) -> None:
    with connect() as connection:
        connection.execute(
            '''
            INSERT INTO briefs (id, sid, first_name, email, project, interest, launch, variant, locale, status, created_at)
            VALUES (:id, :sid, :first_name, :email, :project, :interest, :launch, :variant, :locale, :status, :created_at)
            ON CONFLICT(id) DO UPDATE SET
                sid=excluded.sid,
                first_name=excluded.first_name,
                email=excluded.email,
                project=excluded.project,
                interest=excluded.interest,
                launch=excluded.launch,
                variant=excluded.variant,
                locale=excluded.locale,
                status=excluded.status,
                created_at=excluded.created_at
            ''',
            record,
        )
        connection.commit()


def upsert_brief_enrichment(
    *,
    brief_id: str,
    summary: dict[str, Any],
    locale: str,
    created_at: str,
    finalized_at: str,
    email_sent_at: str | None,
    email_recipient: str | None,
    email_error: str | None,
    enrichment_revision: int = 0,
) -> None:
    with connect() as connection:
        connection.execute(
            '''
            INSERT INTO brief_enrichments (
                brief_id,
                summary_json,
                locale,
                created_at,
                finalized_at,
                email_sent_at,
                email_recipient,
                email_error,
                enrichment_revision
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(brief_id) DO UPDATE SET
                summary_json=excluded.summary_json,
                locale=excluded.locale,
                created_at=brief_enrichments.created_at,
                finalized_at=excluded.finalized_at,
                email_sent_at=excluded.email_sent_at,
                email_recipient=excluded.email_recipient,
                email_error=excluded.email_error,
                enrichment_revision=excluded.enrichment_revision
            ''',
            (
                brief_id,
                json.dumps(summary, ensure_ascii=False, sort_keys=True),
                locale,
                created_at,
                finalized_at,
                email_sent_at,
                email_recipient,
                email_error,
                enrichment_revision,
            ),
        )
        connection.commit()


def get_inactive_briefs(*, threshold_seconds: int):
    """Return brief_ids whose latest message is older than threshold AND
    no enrichment has been sent since (or sweep_sent_at is older than latest message)."""
    with connect() as connection:
        rows = connection.execute(
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
            HAVING MAX(cm.created_at) < datetime('now', ?)
            ''',
            (f'-{threshold_seconds} seconds',),
        ).fetchall()
        return [(row['brief_id'], row['last_msg_at']) for row in rows]
