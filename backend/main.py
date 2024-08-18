from fastapi import FastAPI, Depends, Request, Response
from database.db import engine, SessionLocal
from sqlalchemy.orm import Session
from typing import Annotated, Dict
from database.models import *
from endpoints import auth, seller, buyer, solds, favorite
from endpoints.auth import get_current_user
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
import time
from response.carResponse import CarResponse, SellerResponse
from typing import List, Any

app = FastAPI()

# class DDOSAgainstMiddleware(BaseHTTPMiddleware):
#     def __init__(self, app):
#         super().__init__(app)
#         self.rate_limit_records = defaultdict(float)

#     async def log_message(self, message: str):
#         print(message)

#     async def dispatch(self, request: Request, call_next):
#         client_ip = request.client.host
#         current_time = time.time()
#         path = request.url.path
        
#         if path not in ["/docs", "/openapi.json"]:
#             if current_time - self.rate_limit_records[client_ip] < 1:
#                 return Response(content="Rate limit exceeded", status_code=429)
#             self.rate_limit_records[client_ip] = current_time
        
#         await self.log_message(f"Request to {path}")
        
#         start_time = time.time()
#         response = await call_next(request)
#         process_time = time.time() - start_time

#         response.headers["Process-Time"] = str(process_time)
#         await self.log_message(f'Response for {path} took {process_time} seconds')
#         return response

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    seller = db.query(Seller).limit(6).all()
    offer = []
    for s in seller:
        user = db.query(User).filter(User.id == s.user_id).first() 
        users = {
            "id": user.id,
            "name": user.username,
            "email": user.email
        }
        car = db.query(Car).filter(Car.id == s.car_id).first()
        cars = {
            "id": car.id,
            "brand": car.brand.name,
            "model": car.model.name,
            "type": car.type.name,
            "fuel": car.fuel.name,
            "tachometer": car.tachometer,
            "made_at": car.made_at,
            "description": car.description,
            "car_body": car.car_body.name,
            "gearbox": car.gearbox.name,
            "power": car.power,
            "place_of_sale": car.place_of_sale,
            "country": car.country.name,
            "history": car.history
        }
        offer.append({
            "user": users,
            "car": cars,
            "price": s.price,
            "min_price": s.min_price,
            "sold": s.sold
        })
    return offer