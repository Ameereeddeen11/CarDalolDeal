from fastapi import FastAPI, Depends
from database.db import engine, SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated
from database.models import *
from endpoints import auth, seller, buyer

app = FastAPI()
app.include_router(auth.router)
app.include_router(seller.router)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[User, Depends()]

@app.get("/")
async def read_root(db: db_dependency):
    seller = db.query()
    return seller