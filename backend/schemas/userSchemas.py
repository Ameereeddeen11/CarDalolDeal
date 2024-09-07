from pydantic import BaseModel
from typing import Optional

class CreateUserRequest(BaseModel):
    username: str
    firstname: Optional[str]
    lastname: Optional[str]
    email: str
    password: str

class UserUpdate(BaseModel):
    username: Optional[str]
    firstname: Optional[str]
    lastname: Optional[str]
    email: Optional[str]

class UserUpdatePassword(BaseModel):
    old_password: str
    password: Optional[str]

class Token(BaseModel):
    access_token: str
    token_type: str