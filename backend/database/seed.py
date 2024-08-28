from .models import Brand, Model, Type, CarBody, Gearbox, Country, Fuel
from .db import SessionLocal

def seed():
    db = SessionLocal()
    try:
        db.add(Brand(name="BMW"))
        db.add(Model(name="i8", brand_id=1, type_id=1))
        db.add(Type(name="Coupe", type_id=1))
        db.add(CarBody(name="Sedan"))
        db.add(Gearbox(name="Manuel"))
        db.add(Country(name="Germany"))
        db.add(Fuel(name="Benzin"))
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed()