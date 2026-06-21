from fastapi import APIRouter
from pydantic import BaseModel

from app.services.gemini_service import (
    generate_marketing_content,
    analyze_review
)

router = APIRouter()


class ContentRequest(BaseModel):
    business_name: str
    business_type: str
    location: str
    content_type: str
    prompt: str
class ReviewRequest(BaseModel):
    review_text: str

@router.post("/generate-content")
def generate_content(data: ContentRequest):

    result = generate_marketing_content(
        data.business_name,
        data.business_type,
        data.location,
        data.content_type,
        data.prompt
    )

    return {
        "content": result
    }
@router.post("/analyze-review")
def analyze_customer_review(data: ReviewRequest):

    result = analyze_review(
        data.review_text
    )

    return {
        "analysis": result
    }