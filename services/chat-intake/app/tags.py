import re
from typing import NamedTuple


TAG_RE = re.compile(r"<([A-Z_]+)\s*/>")
KNOWN_TAGS = {"MINIMUM_REACHED", "READY_TO_SUBMIT"}


class ParsedTags(NamedTuple):
    content: str
    tags: list[str]
    unknown_tags: list[str]


def strip_tags(content: str) -> ParsedTags:
    tags = [match.group(1) for match in TAG_RE.finditer(content)]
    cleaned = TAG_RE.sub("", content).strip()
    known_tags = [tag for tag in tags if tag in KNOWN_TAGS]
    unknown_tags = [tag for tag in tags if tag not in KNOWN_TAGS]
    return ParsedTags(content=cleaned, tags=known_tags, unknown_tags=unknown_tags)
