from fastapi import APIRouter, Depends, HTTPException, Request
from datetime import datetime, timedelta
from typing import Annotated
from starlette import status
from sqlalchemy.orm import Session
from database.db import SessionLocal
from database.models import User
from passlib.context import CryptContext
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from schemas.userSchemas import *
from response.userResponse import *

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

SECRET_KEY = "Lily<3"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# this is the endpoint to register a user
# it takes in a CreateUserRequest object and returns a UserLoginResponse object
# the status code is set to 201
@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=UserLoginResponse)
async def register_user(db: db_dependency, create_user_request: CreateUserRequest):
    create_user_model = User(
        username=create_user_request.username,
        firstname=create_user_request.firstname,
        lastname=create_user_request.lastname,
        email=create_user_request.email,
        password=pwd_context.hash(create_user_request.password)
    )
    db.add(create_user_model)
    db.commit()

    token = create_access_token(create_user_request.username, create_user_model.id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    send_email(create_user_request.email, token)

    return {
        "username": create_user_request.username,
        "email": create_user_request.email
    }

def send_email(email: str, token: str):
    pass    

# this is the endpoint to login a user
# it takes in a OAuth2PasswordRequestForm object and returns a Token object
# the status code is set to 200
@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
async def login_user(db: db_dependency, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    token = create_access_token(user.username, user.id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    refresh_token = create_refresh_token(user.username, user.id, timedelta(days=7))
    return {'access_token': token, 'token_type': 'bearer', 'refresh_token': refresh_token}

# this is the endpoint to refresh a token
# this is used to get a new_access_token
# it takes in a refresh token and returns a RefreshToken object
# the status code is set to 200
@router.post("/refresh-token", response_model=RefreshToken, status_code=status.HTTP_200_OK)
async def refresh_token(refresh_token: str):
    try:
        payload = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        if username and user_id is None: 
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
        token = create_access_token(username, user_id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
        return {'access_token': token, 'token_type': 'bearer'}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")

# this is the function to authenticate a user
# it takes in a db object, a username and a password
# it returns a boolean
def authenticate_user(db: db_dependency, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.password):
        return False
    return user

# this is the function to create an access token
# it takes in a username, a user_id and an expires_delta
# it returns a jwt token
def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    to_encode = {"sub": username, "user_id": user_id}
    expires = datetime.utcnow() + expires_delta
    to_encode.update({'exp': expires})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# this is the function to create a refresh token
# it takes in a username, a user_id and an expires_delta
# it returns a jwt token
def create_refresh_token(username: str, user_id: int, expires_delta: timedelta):
    to_encode = {"sub": username, "user_id": user_id}
    expires = datetime.utcnow() + expires_delta
    to_encode.update({'exp': expires})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# this is the function to get the current user
# it takes in a token and return a dictionary 
# with the username and user_id
async def get_current_user(token: Annotated[str, Depends(oauth_scheme)]):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
        return {
            "username": username,
            "user_id": user_id
        }
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    
# this is the dependency to get the current user
# it takes in a get_current_user function and returns a dictionary
user_dependency = Annotated[dict, Depends(get_current_user)]

# this is the endpoint to verify a token
# it takes in a user_dependency object and returns a dictionary
@router.post("/verify-token", status_code=status.HTTP_200_OK)
async def verify_user(user: user_dependency):
    return user

# this is the endpoint to read a user
# it takes in a user_dependency object and returns a UserResponse object
# the status code is set to 200
# if the user is not found, it raises a 404 error
@router.get("/user/", status_code=status.HTTP_200_OK, response_model=UserResponse)
async def read_user(user: user_dependency, db: db_dependency):
    user = db.query(User).filter(User.id == user["user_id"]).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User onauthorized")
    return {
        "id": user.id,
        "username": user.username, 
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email
    }
    
# this is the endpoint to update a user
# it takes in a user_id, a user_dependency object and a UserUpdate object
# the status code is set to 200
@router.put("/update/{user_id}", status_code=status.HTTP_200_OK)
async def update_user(db: db_dependency, user_id: int, create_user_request: UserUpdate, user: user_dependency):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    for key, value in create_user_request.dict().items():
        if value is not None and value != "":
            setattr(user, key, value)
            db.commit()
    return {"message": "User updated successfully"}

# this is the endpoint to update a user's password
# it takes in a user_id, a user_dependency object and a UserUpdatePassword object
# the status code is set to 200
@router.put("/update/password/{user_id}", status_code=status.HTTP_200_OK)
async def update_password(db: db_dependency, user_id: int, password: UserUpdatePassword, user: user_dependency):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if not pwd_context.verify(password.old_password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect password")
    
    user.password = pwd_context.hash(password.password)
    db.commit()
    return {"message": "Password updated successfully"}

# this is the endpoint to delete a user
# it takes in a user_dependency object
# the status code is set to 200
# if the user is not found, it raises a 404 error
@router.delete("/delete/", status_code=status.HTTP_200_OK)
async def delete_user(db: db_dependency, user: Annotated[User, Depends(get_current_user)]):
    user = db.query(User).filter(User.id == user["user_id"]).first()
    if not user: 
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}