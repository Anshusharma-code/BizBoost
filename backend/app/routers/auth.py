from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.db.models import User

from app.schemas.auth import UserCreate, UserLogin

from app.services.auth_service import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/api/auth",
    tags=["Auth"]
)

# ---------------- REGISTER ----------------
@router.post("/register")
def register(
    data: UserCreate,
    db: Session = Depends(get_db)
):

    # check if user already exists
    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=data.name,
        email=data.email,
        hashed_password=hash_password(
            data.password
        )
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(
        {"sub": new_user.email}
    )

    return {
        "message": "User created successfully",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }


# ---------------- LOGIN ----------------
@router.post("/login")
def login(
    data: UserLogin,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    if not verify_password(
        data.password,
        user.hashed_password
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid credentials"
        )

    token = create_access_token(
        {"sub": user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }