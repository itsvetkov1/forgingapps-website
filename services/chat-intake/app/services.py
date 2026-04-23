from __future__ import annotations

from typing import Any

from app.llm.codex import call_codex_responses
from app.prompt_stack import (
    DEFAULT_MODEL,
    assemble_system_prompt,
    chat_messages_to_codex_input,
    normalize_locale,
    normalize_variant,
    prepend_session_header,
)
from app.tags import strip_tags


def generate_cinder_reply(*, session: dict[str, Any], history: list[dict[str, str]], message: str, model: str | None = None) -> dict[str, Any]:
    variant = normalize_variant(session.get('variant'))
    locale = normalize_locale(session.get('locale'))
    first_name = str(session.get('firstName') or '').strip() or 'there'
    topic = str(session.get('topic') or '').strip() or 'project'
    brief_id = str(session.get('brief_id') or 'FA-2604-TEST').strip()
    effective_model = (model or DEFAULT_MODEL).strip() or DEFAULT_MODEL

    prepared_history, prepared_message = prepend_session_header(
        history,
        message,
        brief_id=brief_id,
        first_name=first_name,
        topic=topic,
        locale=locale,
        variant=variant,
    )
    instructions = assemble_system_prompt(variant)
    input_items = chat_messages_to_codex_input(prepared_history, prepared_message)
    result = call_codex_responses(
        model=effective_model,
        instructions=instructions,
        input_items=input_items,
    )
    parsed = strip_tags(str(result.get('reply', '')))
    result['reply'] = parsed.content
    return result
