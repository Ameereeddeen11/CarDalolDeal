from main import app
from fastapi.testclient import TestClient
from .test_auth import login_user
import io

client = TestClient(app)

datas = {
        "name": "hi",
        "brand": 1,
        "model": 1,
        "type": 1,
        "fuel": 1,
        "tachometer": 1,
        "made_at": 1,
        "description": "hi",
        "car_body": 1,
        "gearbox": 1,
        "power": 1,
        "place_of_sale": "hi",
        "country_of_car": 1,
        "history": "hi",
        "price": 1,
        "min_price": 1,
        
    }

def test_create_seller():
    response = client.post(
        "/seller/add_car/", 
        headers={"Authorization": f"Bearer {login_user()}"},
        data = {
            "name": "hi",
            "brand": 1,
            "model": 1,
            "type": 1,
            "fuel": 1,
            "tachometer": 1,
            "made_at": 1,
            "description": "hi",
            "car_body": 1,
            "gearbox": 1,
            "power": 1,
            "place_of_sale": "hi",
            "country_of_car": 1,
            "history": "hi",
            "price": 1,
            "min_price": 1
        },
        files={
            "images": (
                "test_image.jpg",
                io.BytesIO(b"fake image data"),
                "image/jpeg"
            )
        }
    )
    assert response.status_code == 201

def test_read_seller():
    response = client.get("/seller/1")
    assert response.status_code == 200
    # assert response.json() == [
    #     {
    #         "name": "hi",
    #         "brand": "BMW",
    #         "model": "i8",
    #         "type": "Coupe",
    #         "fuel": "Benzin",
    #         "tachometer": "100",
    #         "made_at": "2024",
    #         "description": "hi",
    #         "car_body": "Sedan",
    #         "gearbox": "Manuel",
    #         "power": "100",
    #         "place_of_sale": "hi",
    #         "country_of_car": "Germany",
    #         "history": "hi",
    #         "price": "1000000",
    #         "min_price": "750000"
    #     }
    # ]

def test_read_seller():
    response = client.get(
        "/seller/advertise/",
        headers={"Authorization": f"Bearer {login_user()}"}
    )
    assert response.status_code == 200
    # assert response.json() == [
    #     {
    #         "name": "hi",
    #         "brand": "BMW",
    #         "model": "i8",
    #         "type": "Coupe",
    #         "fuel": "Benzin",
    #         "tachometer": "100",
    #         "made_at": "2024",
    #         "description": "hi",
    #         "car_body": "Sedan",
    #         "gearbox": "Manuel",
    #         "power": "100",
    #         "place_of_sale": "hi",
    #         "country_of_car": "Germany",
    #         "history": "hi",
    #         "price": "1000000",
    #         "min_price": "750000"
    #     }
    # ]