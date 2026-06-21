from pydantic import BaseModel


class BusinessProfileCreate(BaseModel):
    business_name: str
    business_type: str
    location: str
    services: str
    phone: str
    website: str
    instagram: str