from fastapi import FastAPI, Depends
from database.db import engine, SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated
from database.models import *
from endpoints import auth, seller, buyer, solds

app = FastAPI()
app.include_router(auth.router)
app.include_router(seller.router)
app.include_router(buyer.router)
app.include_router(solds.router)

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
    seller = db.query().limit(6).all()
    return seller

@app.get("/sold")
async def sold(
        db: db_dependency,
        user: user_dependency,
        buyer_id: int
    ):
    sold = db.query(Sold)