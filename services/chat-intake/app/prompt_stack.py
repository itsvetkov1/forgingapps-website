from __future__ import annotations

from pathlib import Path
from typing import Literal

PROMPTS_DIR = Path('/opt/forgingapps/chat-intake/prompts')
DEFAULT_MODEL = 'gpt-5.4'
DEFAULT_VARIANT = 'generic'
DEFAULT_LOCALE = 'en'


def read_prompt(name: str, prompts_dir: Path = PROMPTS_DIR) -> str:
    path = prompts_dir / name
    return path.read_text(encoding='utf-8').strip()


def assemble_system_prompt(variant: str, prompts_dir: Path = PROMPTS_DIR) -> str:
    style = read_prompt('style-guide.md', prompts_dir)
    persona = read_prompt('cinder_persona.md', prompts_dir)
    variant_text = read_prompt(f'system/{variant}.md', prompts_dir)
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
    system_path = PROMPTS_DIR / 'system' / f'{variant}.md'
    return variant if system_path.is_file() else DEFAULT_VARIANT


def normalize_locale(value: str | None) -> Literal['en', 'bg']:
    return 'bg' if (value or '').strip().lower() == 'bg' else 'en'
