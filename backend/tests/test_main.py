from main import app
from fastapi.testclient import TestClient
from database.db import SessionLocal
from database.models import *

client = TestClient(app)

def create_data():
    session = SessionLocal()
    db_brand = Brand(name="BMW")
    db_model = Model(name="i8")
    db_type = Type(name="Coupe")
    db_fuel = Fuel(name="Benzin")
    db_car_body = CarBody(name="Sedan")
    db_gearbox = Gearbox(name="Manuel")
    db_country = Country(name="Germany")
    session.add_all([db_brand, db_model, db_type, db_fuel, db_car_body, db_gearbox, db_country])
    session.commit()

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == [
        {
            "name": "hi",
            "brand": "BMW",
            "model": "i8",
            "type": "Coupe",
            "fuel": "Benzin",
            "tachometer": "100",
            "made_at": "2024",
            "description": "hi",
            "car_body": "Sedan",
            "gearbox": "Manuel",
            "power": "100",
            "place_of_sale": "hi",
            "country_of_car": "Germany",
            "history": "hi",
            "price": "1000000",
            "min_price": "750000"
        }
    ]
    
def test_read_seller():
    response = client.get(
        "/seller/1"
    )
    assert response.status_code == 200
    assert response.json() == [
        {
            "name": "hi",
            "brand": "BMW",
            "model": "i8",
            "type": "Coupe",
            "fuel": "Benzin",
            "tachometer": "100",
            "made_at": "2024",
            "description": "hi",
            "car_body": "Sedan",
            "gearbox": "Manuel",
            "power": "100",
            "place_of_sale": "hi",
            "country_of_car": "Germany",
            "history": "hi",
            "price": "1000000",
            "min_price": "750000"
        }
    ]