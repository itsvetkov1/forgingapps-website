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
            SELECT summary_json, finalized_at
            FROM brief_enrichments
            WHERE brief_id = ?
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
                email_error
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(brief_id) DO UPDATE SET
                summary_json=excluded.summary_json,
                locale=excluded.locale,
                created_at=brief_enrichments.created_at,
                finalized_at=excluded.finalized_at,
                email_sent_at=excluded.email_sent_at,
                email_recipient=excluded.email_recipient,
                email_error=excluded.email_error
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
            ),
        )
        connection.commit()
