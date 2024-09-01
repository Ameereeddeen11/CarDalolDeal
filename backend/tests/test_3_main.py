from fastapi.testclient import TestClient
from .test_2_seller import datas, login_user
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user": {
            "name": "test",
            "email": "test@test.com"
        },
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

def test_delete_seller():
    response = client.delete(
        "/seller/delete/car/1/",
        headers={"Authorization": f"bearer {login_user()}"}
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Car deleted successfully"}