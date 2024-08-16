from fastapi import FastAPI, Depends
from database.db import engine, SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated
from database.models import *
from endpoints import auth, seller, buyer, solds, favorite
from endpoints.auth import get_current_user

app = FastAPI()
app.include_router(auth.router)
app.include_router(seller.router)
app.include_router(buyer.router)
app.include_router(solds.router)
app.include_router(favorite.router)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[User, Depends(get_current_user)]

@app.get("/")
async def read_root(db: db_dependency):
    seller = db.query().limit(6).all()
    return seller