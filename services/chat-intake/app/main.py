from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import init_schema
from app.routes.briefs import router as briefs_router
from app.routes.chat import router as chat_router
from app.routes.health import router as health_router

init_schema()

app = FastAPI(title='chat-intake', version='0.1.0')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'https://forgingapps.com',
        'https://www.forgingapps.com',
        'https://forgingapps.pages.dev',
    ],
    allow_origin_regex=r'https://[A-Za-z0-9-]+\.forgingapps\.pages\.dev',
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'OPTIONS'],
    allow_headers=['Accept', 'Content-Type', 'X-Synthetic-Warmup'],
)
app.include_router(health_router)
app.include_router(briefs_router)
app.include_router(chat_router)
