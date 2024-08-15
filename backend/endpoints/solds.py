from .seller import APIRouter, HTTPException, db_dependency, user_dependency
from database.models import *

router = APIRouter(
    prefix="/solds",
    tags=["solds"]
)

@router.post("seller/{price}")
async def seller_agreement(
        db: db_dependency,
        user: user_dependency,
        price: int
    ):
    seller = db.query(Seller).filter(Seller.user_id == user["user_id"]).first().id
    if not seller: 
        raise HTTPException(status_code=404, detail="Seller not found")
    sold = db.query(Sold).filter(Sold.seller_id == seller).first()
    if not sold:    
        new_sold = Sold(
            seller_id = user["user_id"],
            price = price,
            seller_agreement = True
        )
        db.add(new_sold)
        db.commit() 
    elif sold.price == price:
        sold.price = price
        sold.seller_agreement = True
        db.add(sold)
        db.commit()

    return {"message": "Sold"}

@router.post("buyer/{car_id}/{price}")
async def buyer_agreement(
        db: db_dependency,
        user: user_dependency,
        price: int,
        car_id: int
    ):
    seller = db.query(Seller).filter(Seller.car_id == car_id).first().id
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    sold = db.query(Sold).filter(Sold.seller_id == seller).first()
    if not sold:
        new_sold = Sold(
            buyer_id = user["user_id"],
            price = price,
            seller_id = seller
        )
        db.add(new_sold)
    elif sold.price == price:
        sold.buyer_id = user["user_id"]
        sold.buyer_agreement = True
        db.add(sold)    
    db.commit()

    return {"message": "Sold"}