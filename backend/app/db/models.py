from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.db.database import Base
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

class BusinessProfile(Base):
    __tablename__ = "business_profiles"

    id = Column(Integer, primary_key=True, index=True)

    business_name = Column(String)
    business_type = Column(String)
    location = Column(String)

    services = Column(Text)

    phone = Column(String)
    website = Column(String)
    instagram = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class ContentHistory(Base):
    __tablename__ = "content_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    content_type = Column(String)

    prompt = Column(Text)

    generated_content = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


class ReviewAnalysis(Base):
    __tablename__ = "review_analysis"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
    Integer,
    ForeignKey("users.id")
)

    review_text = Column(Text)

    analysis = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
class PosterHistory(Base):
    __tablename__ = "poster_history"

    id = Column(Integer, primary_key=True)
    user_id = Column(
    Integer,
    ForeignKey("users.id")
)

    festival = Column(String)

    prompt = Column(Text)

    image_url = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(String)

    email = Column(
        String,
        unique=True,
        index=True
    )

    hashed_password = Column(String)

    is_active = Column(
        Boolean,
        default=True
    )