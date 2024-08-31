from fastapi.testclient import TestClient
from .test_1_auth import login_user
import io
from main import app

client = TestClient(app)

datas = {
        "name": "hi",
        "brand": 1,
        "model": 1,
        "type": 1,
        "fuel": 1,
        "tachometer": 50,
        "made_at": 2022,
        "description": "hi",
        "car_body": 1,
        "gearbox": 1,
        "power": 588,
        "place_of_sale": "hi",
        "country_of_car": 1,
        "history": "hi",
        "price": 9700000,
        "min_price": 9500000
    }

def test_create_seller():
    response = client.post(
        "/seller/add_car/", 
        headers={"Authorization": f"Bearer {login_user()}"},
        data = datas,
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
    # assert response.json() == datas

def test_read_seller():
    response = client.get(
        "/seller/advertise/",
        headers={"Authorization": f"Bearer {login_user()}"}
    )
    assert response.status_code == 200
    # assert response.json() == datas
