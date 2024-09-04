from pydantic import BaseModel

class UserResponse(BaseModel):
    id: int
    username: str
    firstname: str
    lastname: str
    email: str

    class Config:
        orm_mode = True

class UserLoginResponse(BaseModel):
    username: str
    email: str