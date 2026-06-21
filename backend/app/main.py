from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.ai import router as ai_router
from app.db.database import Base, engine
from app.db import models
from app.routers.profile import router as profile_router
from app.routers.content import router as content_router
from app.routers.poster import (
    router as poster_router
)
from app.routers import auth


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BizBoost AI API",
    version="1.0.0"
)
app.include_router(auth.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    ai_router,
    prefix="/api/ai",
    tags=["AI"]
)
app.include_router(profile_router)


app.include_router(content_router)
app.include_router(
    poster_router
)

@app.get("/")
def root():
    return {
        "message": "BizBoost Backend Running 🚀"
    }