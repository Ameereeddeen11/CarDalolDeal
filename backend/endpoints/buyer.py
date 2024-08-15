from .seller import APIRouter, HTTPException, db_dependency, user_dependency
from database.models import *
from schemas.buyerSchemas import *

router = APIRouter(
    prefix="/buyer",
    tags=["bayer"]
)

@router.get("/interests")
async def get_interests(db: db_dependency, user: user_dependency):
    interests = db.query(Buyer).filter(Buyer.user_id == user["user_id"]).all()
    if interests is None:
        raise HTTPException(status_code=404, detail="Interests not found")
    return interests

@router.post("/add_interest/{car_id}")
async def add_interest(
        db: db_dependency,
        user: user_dependency,
        car_id: int,
        add_interest_request: CreateBuyer
    ):
    new_interest = Buyer(
        user_id = user["user_id"],
        car_id = car_id,
        buyer_price = add_interest_request.buyer_price,
        max_buyer_price = add_interest_request.max_buyer_price
    )
    db.add(new_interest)
    db.commit()

    return new_interest

@router.put("/update_interest/{car_id}")
async def update_interest(
        db: db_dependency,
        user: user_dependency,
        car_id: int,
        update_interest_request: UpdateBuyer
    ):
    buyer = db.query(Buyer).filter(Buyer.car_id == car_id, Buyer.user_id == user["user_id"]).first()
    if not buyer:
        raise HTTPException(status_code=404, detail="Interest not found")
    for key, value in update_interest_request.dict().items():
        if value is not None and value != 0:
            setattr(buyer, key, value)
            db.commit()
    return buyer
