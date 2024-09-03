from pydantic import BaseModel

class UserResponse(BaseModel):
    username: str
    firstname: str
    lastname: str
    email: str

    class Config:
        orm_mode = True