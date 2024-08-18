from pydantic import BaseModel

class BrandResponse(BaseModel):
    name: str

    class Config:
        orm_mode = True

class ModelResponse(BaseModel):
    name: str

    class Config:
        orm_mode = True

class CarResponse(BaseModel):
    brand: BrandResponse
    model: ModelResponse
    type: int
    fuel: int
    tachometer: int
    made_at: int
    car_body: int
    gearbox: int
    power: int
    place_of_sale: str
    country: int

    class Config:
        orm_mode = True

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True

class SellerResponse(BaseModel):
    id: int
    price: int
    min_price: int
    sold: bool
    car_id: CarResponse

    class Config:
        orm_mode = True