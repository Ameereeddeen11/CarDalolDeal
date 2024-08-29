from database.db import SessionLocal
from database.models import *
from main import db_dependency

def create_data(db: db_dependency):
    db_brand = Brand(name="Mercedes", id=2)
    db_model = Model(name="Class G", id=4, brand_id=2, type_id=2)
    db_type = Type(name="Personal", id=2)
    db_fuel = Fuel(name="Diesel", id=2)
    db_car_body = CarBody(name="SUV", id=2)
    db_gearbox = Gearbox(name="Automatic", id=2)
    db_country = Country(name="Germany", id=2)
    db.add_all([db_brand, db_model, db_type, db_fuel, db_car_body, db_gearbox, db_country])
    db.commit()

if __name__ == "__main__":
    db = SessionLocal()
    create_data(db)
    db.close()