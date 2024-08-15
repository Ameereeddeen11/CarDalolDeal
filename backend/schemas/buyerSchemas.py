from pydantic import BaseModel
from typing import Optional

class CreateBuyer(BaseModel):
    buyer_price: Optional[int]
    max_buyer_price: Optional[int]

class UpdateBuyer(CreateBuyer):
    pass