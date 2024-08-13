from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CreateSeller(BaseModel):
    price: Optional[int]
    min_price: Optional[int]
    sold: Optional[bool]