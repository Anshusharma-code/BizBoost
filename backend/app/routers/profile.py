from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.db.models import BusinessProfile
from app.schemas.profile import BusinessProfileCreate

router = APIRouter(
    prefix="/api/profile",
    tags=["Profile"]
)


@router.post("/")
def create_profile(
    profile: BusinessProfileCreate,
    db: Session = Depends(get_db)
):

    new_profile = BusinessProfile(
        business_name=profile.business_name,
        business_type=profile.business_type,
        location=profile.location,
        services=profile.services,
        phone=profile.phone,
        website=profile.website,
        instagram=profile.instagram,
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return {
        "message": "Profile saved successfully",
        "id": new_profile.id
    }