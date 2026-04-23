from __future__ import annotations

import os
from pathlib import Path
from typing import Literal

DEFAULT_PROMPTS_DIR = Path('/opt/forgingapps/chat-intake/prompts')
REPO_PROMPTS_DIR = Path(__file__).resolve().parents[1] / 'prompts'
DEFAULT_MODEL = 'gpt-5.4'
DEFAULT_VARIANT = 'generic'
DEFAULT_LOCALE = 'en'


def resolve_prompts_dir() -> Path:
    override = os.getenv('CHAT_INTAKE_PROMPTS_DIR')
    if override:
        return Path(override).expanduser()
    if DEFAULT_PROMPTS_DIR.exists():
        return DEFAULT_PROMPTS_DIR
    return REPO_PROMPTS_DIR


def read_prompt(name: str, prompts_dir: Path | None = None) -> str:
    path = (prompts_dir or resolve_prompts_dir()) / name
    return path.read_text(encoding='utf-8').strip()


def assemble_system_prompt(variant: str, prompts_dir: Path | None = None) -> str:
    prompts_root = prompts_dir or resolve_prompts_dir()
    style = read_prompt('style-guide.md', prompts_root)
    persona = read_prompt('cinder_persona.md', prompts_root)
    variant_text = read_prompt(f'system/{variant}.md', prompts_root)
    return (
        '=== STYLE GUIDE (canonical voice, format, tags, hard rules) ===\n'
        f'{style}\n\n'
        '=== CINDER PERSONA (identity, facts, post-contact fact sheet) ===\n'
        f'{persona}\n\n'
        f'=== VARIANT SYSTEM PROMPT: {variant} (extraction targets, per-package framing) ===\n'
        f'{variant_text}\n'
    )


def build_session_header(*, brief_id: str, first_name: str, topic: str, locale: str, variant: str) -> str:
    return (
        '--- SESSION CONTEXT (do not repeat back verbatim) ---\n'
        f'brief_id: {brief_id}\n'
        f'visitor.firstName: {first_name}\n'
        f'visitor.topic: {topic}\n'
        f'locale: {locale}\n'
        f'variant: {variant}\n'
        '--- END CONTEXT ---\n\n'
    )


def prepend_session_header(history: list[dict[str, str]], message: str, *, brief_id: str, first_name: str, topic: str, locale: str, variant: str) -> tuple[list[dict[str, str]], str]:
    header = build_session_header(
        brief_id=brief_id,
        first_name=first_name,
        topic=topic,
        locale=locale,
        variant=variant,
    )
    updated_history = [dict(turn) for turn in history]
    for turn in updated_history:
        if turn.get('role') == 'user':
            turn['content'] = header + str(turn.get('content', ''))
            return updated_history, message
    return updated_history, header + message


def chat_messages_to_codex_input(history: list[dict[str, str]], message: str) -> list[dict[str, str]]:
    items: list[dict[str, str]] = []
    for turn in history:
        role = turn.get('role', '')
        if role not in {'user', 'assistant'}:
            continue
        items.append({'role': role, 'content': str(turn.get('content', ''))})
    items.append({'role': 'user', 'content': message})
    return items


def normalize_variant(value: str | None) -> str:
    variant = (value or DEFAULT_VARIANT).strip() or DEFAULT_VARIANT
    system_path = resolve_prompts_dir() / 'system' / f'{variant}.md'
    return variant if system_path.is_file() else DEFAULT_VARIANT


def normalize_locale(value: str | None) -> Literal['en', 'bg']:
    return 'bg' if (value or '').strip().lower() == 'bg' else 'en'
