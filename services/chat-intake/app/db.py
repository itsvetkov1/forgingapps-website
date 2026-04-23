"""SQLite connection and schema helpers for chat-intake."""

from __future__ import annotations

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
