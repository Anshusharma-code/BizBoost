from pydantic import BaseModel


class ContentHistoryCreate(BaseModel):
    content_type: str
    prompt: str
    generated_content: str