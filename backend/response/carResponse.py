from pydantic import BaseModel
from typing import List, Optional

class BrandResponse(BaseModel):
    name: str

    class Config:
        orm_mode = True

class CarResponse(BaseModel):
    brand: str
    model: str
    year: int
    price: int
    color: str
    km: int
    description: str
    image: str

    class Config:
        orm_mode = True
