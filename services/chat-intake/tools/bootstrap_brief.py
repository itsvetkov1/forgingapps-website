from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[1]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from app.brief_bootstrap import default_created_at, persist_brief_bootstrap
from app.db import init_schema


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Seed or update a chat-intake brief record and session bootstrap files.')
    parser.add_argument('--brief-id', required=True)
    parser.add_argument('--sid', required=True)
    parser.add_argument('--first-name', required=True)
    parser.add_argument('--email', required=True)
    parser.add_argument('--project', required=True)
    parser.add_argument('--interest', default='')
    parser.add_argument('--launch', default='')
    parser.add_argument('--locale', choices=['en', 'bg'], default='en')
    parser.add_argument('--variant', default='generic')
    parser.add_argument('--status', default='open')
    parser.add_argument('--created-at', default=default_created_at())
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    init_schema()
    form_data_path = persist_brief_bootstrap(
        brief_id=args.brief_id,
        sid=args.sid,
        first_name=args.first_name,
        email=args.email,
        project=args.project,
        interest=args.interest,
        launch=args.launch,
        locale=args.locale,
        variant=args.variant,
        status=args.status,
        created_at=args.created_at,
    )
    print(json.dumps({'ok': True, 'brief_id': args.brief_id, 'sid': args.sid, 'db': str(init_schema()), 'form_data': str(form_data_path)}))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
