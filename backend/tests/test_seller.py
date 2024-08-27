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

user = {
    "username": "test",
    "password": "bUeN0"
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