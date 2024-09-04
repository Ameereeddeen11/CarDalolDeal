from pydantic import BaseModel
from .carResponse import CarResponse
from .userResponse import UserResponse

class SellerReponse(BaseModel):
    id: int
    user: UserResponse
    price: int
    min_price: int
    sold: bool
    car: CarResponse
    images: list[str]

    class Config:
        orm_mode = True