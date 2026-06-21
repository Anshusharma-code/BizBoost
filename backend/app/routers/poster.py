from fastapi import APIRouter
from pydantic import BaseModel

from app.services.gemini_service import (
    generate_poster_content
)

router = APIRouter(
    prefix="/api/posters",
    tags=["Posters"]
)


class PosterRequest(BaseModel):
    festival: str
    offer: str
    theme: str


@router.post("/generate")
def generate_poster(data: PosterRequest):

    poster_data = generate_poster_content(
        data.festival,
        data.offer,
        data.theme
    )

    return poster_data