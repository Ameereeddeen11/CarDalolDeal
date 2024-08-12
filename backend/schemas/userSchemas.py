from pydantic import BaseModel
from typing import Optional

class CreateUserRequest(BaseModel):
    username: str
    fistname: Optional[str]
    lastname: Optional[str]
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str