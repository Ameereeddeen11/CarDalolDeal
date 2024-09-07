from fastapi import APIRouter, HTTPException, Depends, File, Form, UploadFile
from database.models import *
from database.db import SessionLocal
from sqlalchemy.orm import Session
from typing import List, Annotated
from schemas.carSchemas import *
from schemas.sellerSchemas import *
from .auth import get_current_user
from response.carResponse import CarResponse
import os
from response.sellerResponse import SellerReponse
from response.userResponse import UserResponse

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[User, Depends(get_current_user)]

router = APIRouter(
    prefix="/seller",
    tags=["seller"]
)

@router.get("/advertise", status_code=200)
async def get_advertise(db: db_dependency, user: user_dependency):
    seller = db.query(Seller).filter(Seller.user_id == user["user_id"]).all()
    response = []
    for s in seller: 
        car = db.query(Car).filter(Car.id == s.car_id).first()
        image = db.query(Image).filter(Image.car_id == car.id).all()
        user = db.query(User).filter(User.id == s.user_id).first()
        response.append({
            "id": s.id,
            "user": {
                "id": user.id,
                "username": user.username,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email
            },
            "price": s.price,
            "min_price": s.min_price,
            "sold": s.sold,
            "car": {
                "id": car.id,
                "name": car.name,
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
            },
            "images": [i.url for i in image],
        })
    return response

@router.get("/{seller_id}", status_code=200)
async def get_seller(seller_id: int, db: db_dependency):
    seller = db.query(Seller).filter(Seller.id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Car not found")
    car = db.query(Car).filter(Car.id == seller.car_id).first()
    image = db.query(Image).filter(Image.car_id == car.id).all()
    user = db.query(User).filter(User.id == seller.user_id).first()
    return [{
        "id": seller.id,
        "user": {
            "id": user.id,
            "username": user.username,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email
        },
        "price": seller.price,
        "min_price": seller.min_price,
        "sold": seller.sold,
        "car": {
            "id": car.id,
            "name": car.name,
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
        },
        "images": [i.url for i in image],
    }]

@router.post("/add_car", status_code=201)
async def add_car( 
        db: db_dependency, 
        user: user_dependency,
        images: List[UploadFile] = File(...),
        name: str = Form(...),
        brand: int = Form(...),
        model: int = Form(...),
        type: int = Form(...),
        fuel: int = Form(...),
        tachometer: int = Form(...),
        made_at: int = Form(...),
        description: str = Form(...),
        car_body: int = Form(...),
        gearbox: int = Form(...),
        power: int = Form(...),
        place_of_sale: str = Form(...),
        country_of_car: int = Form(...),
        history: str = Form(...),
        price: int = Form(...), 
        min_price: int = Form(...)
    ):

    new_car = Car(
        name = name,
        brand_id = brand,
        model_id = model,
        type_id = type,
        fuel_id = fuel,
        tachometer = tachometer,
        made_at = made_at,
        description = description,
        car_body_id = car_body,
        gearbox_id = gearbox,
        power = power,
        place_of_sale = place_of_sale,
        country_of_car =country_of_car,
        history = history,
    )
    db.add(new_car)
    db.commit()

    for image in images:
        with open(f"images/{image.filename}", "wb") as buffer:
            buffer.write(image.file.read())
        new_image = Image(
            car_id = new_car.id,
            url = image.filename
        )
        db.add(new_image)
        db.commit()

    new_seller = Seller(
        user_id = user["user_id"],
        car_id = new_car.id,
        price = price,
        min_price = min_price,
        sold = False
    )
    db.add(new_seller)
    db.commit()

    sold = Sold(
        seller_id = new_seller.id,
        seller_agreement = False
    )
    db.add(sold)
    db.commit()

    return new_car, new_seller

@router.put("/update/price/{seller_id}")
async def update_seller(
        db: db_dependency,
        user:user_dependency,
        seller_id: int,
        update_seller_request: CreateSeller
    ):
    seller = db.query(Seller).filter(Seller.id == seller_id, Seller.user_id == user["user_id"]).first()

    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    for key, value in update_seller_request.dict().items():
        if value is not None and value != 0:
            setattr(seller, key, value)
            db.commit()
    return seller

@router.put("/update/car/{car_id}")
async def update_car(
        db: db_dependency,
        user: user_dependency,
        car_id: int,
        update_car_request: UpdateCar
    ):
    seller = db.query(Seller).filter(Seller.id == car_id, Seller.user_id == user["user_id"]).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    car = db.query(Car).filter(Car.id == seller.car_id).first()
    for key, value in update_car_request.dict().items():
        if value is not None and value != "" and value != "string" and value != 0:
            setattr(car, key, value)
            db.commit()
    return car

@router.put("/update/car/{car_id}/image")
async def update_image(
        db: db_dependency,
        user: user_dependency,
        car_id: int,
        list_of_removed_images: List[int] = Form(...),
        images: List[UploadFile] = File(...)
    ):
    seller = db.query(Seller).filter(Seller.car_id == car_id, Seller.user_id == user["user_id"]).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Car image not found")
    for image_id in list_of_removed_images:
        for_remove = db.query(Image).filter(Image.id == image_id, Image.car_id == car_id).first()
        os.remove(f"images/{for_remove.url}")
        db.delete(for_remove)
        db.commit()

    for img in images:
        with open(f"images/{img.filename}", "wb") as buffer:
            buffer.write(img.file.read())
        new_image = Image(
            car_id = car_id,
            url = img.filename
        )
        db.add(new_image)
        db.commit()
    
    return {"message": "Images updated successfully"}

@router.put("/sold/{car_id}")
async def sold(
        db: db_dependency,
        user: user_dependency,
        car_id: int
    ):
    seller = db.query(Seller).filter(Seller.car_id == car_id, Seller.user_id == user["user_id"]).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Car not found")
    seller.sold = not(seller.sold)
    db.commit()
    return {"message": "Car sold successfully"}

@router.delete("/delete/car/{car_id}")
async def delete_car(
        user: user_dependency,
        db: db_dependency,
        car_id: int,
    ):
    seller = db.query(Seller).filter(Seller.id == car_id, Seller.user_id == user["user_id"]).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Car not found or it is already deleted")
    car = db.query(Car).filter(Car.id == car_id).first()
    images = db.query(Image).filter(Image.car_id == car_id).all()
    sold = db.query(Sold).filter(Sold.seller_id == seller.id).first()
    db.delete(seller)
    db.delete(car)
    db.delete(sold)
    for image in images:
        os.remove(f"images/{image.url}")
        db.delete(image)
    db.commit()
    return {"message": "Car deleted successfully"}