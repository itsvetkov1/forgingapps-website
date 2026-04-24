#!/usr/bin/env python3
"""
cinder_tester.py — end-to-end prompt-stack tester for the ForgingApps chat-intake.

Assembles the Cinder prompt stack (style-guide + cinder_persona + variant + optional
session header) exactly as the live backend is meant to — then either prints the
assembled request for eyeball inspection, or POSTs to any OpenAI-compatible chat
completions endpoint so you can exercise the full flow without waiting for dev's
/intake/message handler.

Usage
-----
    # Assembly-only (no LLM call) — sanity-check prompt composition
    python3 cinder_tester.py \\
        --variant spark \\
        --first-name Mara \\
        --topic "landing page for yoga retreat in June" \\
        --locale en \\
        --msg "What does payment look like?"

    # Full flow (needs CINDER_API_URL + CINDER_API_KEY env vars)
    CINDER_API_URL=https://api.openai.com/v1/chat/completions \\
    CINDER_API_KEY=sk-... \\
    CINDER_MODEL=gpt-5.4 \\
    python3 cinder_tester.py \\
        --variant generic \\
        --first-name Mara \\
        --topic "AI agent for customer support" \\
        --msg "Walk me through what happens next" \\
        --send

    # Multi-turn (pipe in a conversation JSON file)
    python3 cinder_tester.py \\
        --variant anvil \\
        --first-name Mara \\
        --topic "booking platform for yoga studios" \\
        --history history.json \\
        --msg "How do you scope a project?" \\
        --send

Variants
--------
Any file under prompts/system/ without `.md` — e.g. generic, spark, blaze, anvil,
forge, oracle, ai-readiness, ai-chat-assistant, discovery-workshop, hearthstone.

Exit codes
----------
0 — ok
2 — bad args / missing prompt file
3 — HTTP / API error in --send mode
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any


# Prompt stack location — the canonical one on Hydra. Override via CINDER_PROMPTS.
DEFAULT_PROMPTS_DIR = os.environ.get(
    "CINDER_PROMPTS", "/opt/forgingapps/chat-intake/prompts"
)


def read_prompt(prompts_dir: Path, name: str) -> str:
    path = prompts_dir / name
    if not path.is_file():
        print(f"[cinder_tester] missing prompt file: {path}", file=sys.stderr)
        sys.exit(2)
    return path.read_text(encoding="utf-8").strip()


def assemble_system(prompts_dir: Path, variant: str) -> str:
    """Compose the full system prompt: persona + style-guide + variant.

    Order matters — later sections override earlier ones per the stack's own
    self-documented precedence:
        style-guide.md  > cinder_persona.md (facts, voice)
        variant.md      > style-guide.md   (extraction, per-package framing)

    We stitch them head-to-tail so the LLM reads in precedence order. The
    variant goes LAST so its specific instructions are freshest in context.
    """
    style = read_prompt(prompts_dir, "style-guide.md")
    persona = read_prompt(prompts_dir, "cinder_persona.md")
    variant_text = read_prompt(prompts_dir, f"system/{variant}.md")

    return (
        "=== STYLE GUIDE (canonical voice, format, tags, hard rules) ===\n"
        f"{style}\n\n"
        "=== CINDER PERSONA (identity, facts, post-contact fact sheet) ===\n"
        f"{persona}\n\n"
        f"=== VARIANT SYSTEM PROMPT: {variant} (extraction targets, per-package framing) ===\n"
        f"{variant_text}\n"
    )


def build_session_header(
    first_name: str,
    topic: str,
    locale: str,
    variant: str,
    brief_id: str,
) -> str:
    """Prepend-to-first-user-turn header the stack expects."""
    return (
        "--- SESSION CONTEXT (do not repeat back verbatim) ---\n"
        f"brief_id: {brief_id}\n"
        f"visitor.firstName: {first_name}\n"
        f"visitor.topic: {topic}\n"
        f"locale: {locale}\n"
        f"variant: {variant}\n"
        "--- END CONTEXT ---\n\n"
    )


def build_messages(
    system_prompt: str,
    session_header: str,
    history: list[dict[str, str]],
    user_msg: str,
) -> list[dict[str, str]]:
    """Build the OpenAI-style chat messages array.

    First user turn carries the session header. Subsequent turns are clean.
    """
    messages: list[dict[str, str]] = [{"role": "system", "content": system_prompt}]

    if history:
        # Mirror the live backend behavior: the session header is always
        # prepended to the first user turn in the conversation payload.
        injected = False
        for turn in history:
            role = turn.get("role")
            content = turn.get("content", "")
            if role not in ("user", "assistant"):
                print(
                    f"[cinder_tester] history turn has bad role: {role!r}",
                    file=sys.stderr,
                )
                sys.exit(2)
            if role == "user" and not injected:
                content = session_header + content
                injected = True
            messages.append({"role": role, "content": content})
        messages.append({"role": "user", "content": user_msg})
    else:
        # First turn — carry the session header.
        messages.append({"role": "user", "content": session_header + user_msg})

    return messages


def call_api(
    url: str, api_key: str, model: str, messages: list[dict[str, str]]
) -> dict[str, Any]:
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.4,
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"[cinder_tester] HTTP {e.code} from {url}: {body}", file=sys.stderr)
        sys.exit(3)
    except Exception as e:  # noqa: BLE001
        print(f"[cinder_tester] network error: {e}", file=sys.stderr)
        sys.exit(3)


def extract_reply(resp: dict[str, Any]) -> str:
    """Pull the assistant reply out of an OpenAI-shaped response."""
    try:
        return resp["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError):
        return json.dumps(resp, indent=2)


def main() -> None:
    ap = argparse.ArgumentParser(
        description="ForgingApps Cinder intake prompt-stack tester"
    )
    ap.add_argument(
        "--prompts-dir",
        default=DEFAULT_PROMPTS_DIR,
        help="path to prompts/ dir (default: %(default)s; env: CINDER_PROMPTS)",
    )
    ap.add_argument(
        "--variant",
        default="generic",
        help="variant name from system/ (default: generic)",
    )
    ap.add_argument("--first-name", default="Mara", help="visitor.firstName")
    ap.add_argument(
        "--topic",
        default="AI agent for customer support",
        help="visitor.topic — short string",
    )
    ap.add_argument("--locale", default="en", choices=["en", "bg"])
    ap.add_argument("--brief-id", default="FA-2604-001")
    ap.add_argument(
        "--history",
        help="path to JSON file with prior turns (list of {role, content})",
    )
    ap.add_argument(
        "--msg",
        required=True,
        help="visitor message to send this turn",
    )
    ap.add_argument(
        "--send",
        action="store_true",
        help="actually POST to CINDER_API_URL; without this, just dump assembled payload",
    )
    ap.add_argument(
        "--dump",
        choices=["compact", "full"],
        default="compact",
        help="how much of the assembled payload to print in assembly-only mode",
    )
    args = ap.parse_args()

    prompts_dir = Path(args.prompts_dir).expanduser().resolve()
    if not prompts_dir.is_dir():
        print(f"[cinder_tester] no such prompts dir: {prompts_dir}", file=sys.stderr)
        sys.exit(2)

    system_prompt = assemble_system(prompts_dir, args.variant)
    session_header = build_session_header(
        first_name=args.first_name,
        topic=args.topic,
        locale=args.locale,
        variant=args.variant,
        brief_id=args.brief_id,
    )

    history: list[dict[str, str]] = []
    if args.history:
        with open(args.history, "r", encoding="utf-8") as f:
            history = json.load(f)
        if not isinstance(history, list):
            print("[cinder_tester] history must be a JSON list", file=sys.stderr)
            sys.exit(2)

    messages = build_messages(system_prompt, session_header, history, args.msg)

    if not args.send:
        # Assembly-only: show enough to sanity-check the composition.
        print(f"=== prompts dir: {prompts_dir}")
        print(f"=== variant: {args.variant}")
        print(f"=== locale: {args.locale}")
        print(f"=== system prompt length: {len(system_prompt):,} chars")
        print(f"=== message count: {len(messages)}")
        if args.dump == "full":
            print("\n--- FULL PAYLOAD ---")
            print(json.dumps(messages, indent=2, ensure_ascii=False))
        else:
            print("\n--- system prompt (first 400 chars) ---")
            print(system_prompt[:400] + ("…" if len(system_prompt) > 400 else ""))
            print("\n--- first user turn ---")
            print(messages[1]["content"])
            if len(messages) > 2:
                print(f"\n--- plus {len(messages) - 2} prior history turn(s) ---")
        print("\n(Pass --send with CINDER_API_URL + CINDER_API_KEY to actually call the model.)")
        return

    # Send mode — hit an OpenAI-compatible endpoint.
    url = os.environ.get("CINDER_API_URL")
    api_key = os.environ.get("CINDER_API_KEY")
    model = os.environ.get("CINDER_MODEL", "gpt-5.4")
    if not url or not api_key:
        print(
            "[cinder_tester] --send requires CINDER_API_URL and CINDER_API_KEY env vars",
            file=sys.stderr,
        )
        sys.exit(2)

    print(f"=== POST {url} (model={model}) ===")
    resp = call_api(url, api_key, model, messages)
    reply = extract_reply(resp)
    print("\n--- assistant reply ---")
    print(reply)
    print("\n--- raw usage ---")
    usage = resp.get("usage", {})
    if usage:
        print(json.dumps(usage, indent=2))
    else:
        print("(no usage block in response)")


if __name__ == "__main__":
    main()
