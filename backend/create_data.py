from database.db import SessionLocal
from database.models import *
from main import db_dependency

def create_data(db: db_dependency):
    db_brand = Brand(name="Mercedes", id=1)
    db_model = Model(name="Class G", id=1, brand_id=1, type_id=1)
    db_type = Type(name="Personal", id=1)
    db_fuel = Fuel(name="Diesel", id=1)
    db_car_body = CarBody(name="SUV", id=1)
    db_gearbox = Gearbox(name="Automatic", id=1)
    db_country = Country(name="Germany", id=1)
    db.add_all([db_brand, db_model, db_type, db_fuel, db_car_body, db_gearbox, db_country])
    db.commit()

if __name__ == "__main__":
    db = SessionLocal()
    create_data(db)
    db.close()