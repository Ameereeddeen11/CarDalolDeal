from fastapi import APIRouter
from database.models import Favorite
from .seller import db_dependency, user_dependency

router = APIRouter(
    prefix="/favorite",
    tags=["favorite"]
)

@router.get("/favorites")
async def get_favorites(db: db_dependency, user: user_dependency):
    favorite = db.query(Favorite).filter(Favorite.user_id == user["user_id"]).all()
    return favorite

@router.post("/add_favorite/{car_id}")
async def add_favorite(db: db_dependency, user: user_dependency, car_id: int):
    new_favorite = Favorite(
        user_id = user["user_id"],
        car_id = car_id
    )
    db.add(new_favorite)
    db.commit()

    return {"message": "Car has been added"}

@router.delete("/delete/{car_id}")
async def delete(db: db_dependency, user: user_dependency, car_id: int):
    favorite = db.query(Favorite).filter(Favorite.car_id == car_id, Favorite.user_id == user["user_id"])
    db.delete(favorite)
    db.commit()

    return {"message": "It has been deleted"}