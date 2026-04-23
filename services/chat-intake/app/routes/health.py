from fastapi import APIRouter

router = APIRouter(prefix="/intake", tags=["intake"])


@router.get("/health")
def intake_health() -> dict[str, object]:
    return {
        "ok": True,
        "service": "chat-intake",
        "scope": "intake",
    }
