from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CreateCar(BaseModel):
    brand: int
    model: int
    type: int
    fuel: int
    tachometer: int
    made_at: int
    description: str
    car_body: int
    gearbox: int
    power: int
    place_of_sale: str
    country_of_car: int 
    history: str

class UpdateCar(BaseModel):
    brand_id: Optional[int]
    model_id: Optional[int]
    type_id: Optional[int]
    fuel_id: Optional[int]
    tachometer_id: Optional[int]
    made_at: Optional[str]
    description: Optional[str]
    car_body_id: Optional[int]
    gearbox_id: Optional[int]
    power: Optional[int]
    place_of_sale: Optional[str]
    country_of_car: Optional[int]
    history: Optional[str]
