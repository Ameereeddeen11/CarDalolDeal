from pydantic import BaseModel

class BaseResponse(BaseModel):
    name: str

    class Config:
        orm_mode = True

class CarResponse(BaseModel):
    id: int
    name: str
    brand: str
    model: str
    type: str
    fuel: str
    tachometer: int
    made_at: int
    car_body: str
    gearbox: str
    power: int
    place_of_sale: str
    country: str
    history: str

    class Config:
        orm_mode = True