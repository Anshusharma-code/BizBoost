from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.db.models import ContentHistory
from app.schemas.content import ContentHistoryCreate
from app.db.dependencies import (
    get_db,
    get_current_user
)

from app.db.models import (
    ContentHistory,
    User
)

router = APIRouter(
    prefix="/api/content",
    tags=["Content"]
)


@router.post("/")
def save_content(
    data: ContentHistoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    content = ContentHistory(
    user_id=current_user.id,
    content_type=data.content_type,
    prompt=data.prompt,
    generated_content=data.generated_content,
)

    db.add(content)
    db.commit()
    db.refresh(content)

    return {
        "message": "Content saved",
        "id": content.id
    }
@router.get("/")
def get_content_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):
    history = (
    db.query(ContentHistory)
    .filter(
        ContentHistory.user_id ==
        current_user.id
    )
    .order_by(
        ContentHistory.id.desc()
    )
    .all()
)

    return history