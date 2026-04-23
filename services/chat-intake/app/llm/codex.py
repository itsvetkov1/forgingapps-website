from __future__ import annotations

from typing import Any


def _extract_output_text(payload: Any) -> str:
    output = getattr(payload, 'output', None)
    if not isinstance(output, list):
        return ''
    text_parts: list[str] = []
    for item in output:
        content = getattr(item, 'content', None)
        if not isinstance(content, list):
            continue
        for part in content:
            part_type = getattr(part, 'type', None)
            if part_type in {'output_text', 'text'}:
                text = getattr(part, 'text', None)
                if isinstance(text, str):
                    text_parts.append(text)
    return ''.join(text_parts).strip()


def _extract_usage(payload: Any) -> dict[str, Any]:
    usage = getattr(payload, 'usage', None)
    if usage is None:
        return {}
    return {
        'input_tokens': getattr(usage, 'input_tokens', None),
        'output_tokens': getattr(usage, 'output_tokens', None),
        'total_tokens': getattr(usage, 'total_tokens', None),
    }


def call_codex_responses(*, model: str, instructions: str, input_items: list[dict[str, str]]) -> dict[str, Any]:
    from openai import OpenAI
    from hermes_cli.auth import resolve_codex_runtime_credentials

    creds = resolve_codex_runtime_credentials()
    access_token = str(creds.get('api_key') or '').strip()
    base_url = str(creds.get('base_url') or 'https://chatgpt.com/backend-api/codex').rstrip('/')
    if not access_token:
        raise RuntimeError('Missing Codex runtime access token')

    client = OpenAI(api_key=access_token, base_url=base_url)
    payload = {
        'model': model,
        'instructions': instructions,
        'input': input_items,
        'store': False,
        'reasoning': {'effort': 'medium', 'summary': 'auto'},
        'include': ['reasoning.encrypted_content'],
    }

    text_parts: list[str] = []
    final_response = None
    with client.responses.stream(**payload) as stream:
        for event in stream:
            event_type = getattr(event, 'type', None)
            if event_type == 'response.output_text.delta':
                delta = getattr(event, 'delta', '')
                if delta:
                    text_parts.append(delta)
        final_response = stream.get_final_response()

    reply = ''.join(text_parts).strip() or _extract_output_text(final_response)
    if not reply:
        raise RuntimeError('Codex response did not include assistant text')
    return {'reply': reply, 'usage': _extract_usage(final_response)}
