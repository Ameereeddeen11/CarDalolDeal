from main import app
from fastapi.testclient import TestClient

client = TestClient(app)

data = {
        "name": "hi",
        "brand_id": 1,
        "model_id": 1,
        "type_id": 1,
        "fuel_id": 1,
        "tachometer": 1,
        "made_at": 1,
        "description": "hi",
        "car_body_id": 1,
        "gearbox_id": 1,
        "power": 1,
        "place_of_sale": "hi",
        "country_of_car": 1,
        "history": "hi",
        "price": 1,
        "min_price": 1
    }

# def test_create_seller(test_seller):
#     response = client.post("/seller/add_car", data=test_seller)
#     assert response.status_code == 200
#     assert response.json() == test_seller

# def test_read_seller():
#     response = client.get("/seller/1")
#     assert response.status_code == 200

# def test_update_test():
#     response = client.put("/seller/1")
#     assert response.status_code == 200
#     assert response.json() == {
#         "sold": True,
#         "price": 1,
#         "min_price": 1
#     }

# def test_delete_seller():
#     response = client.delete("/seller/1")
#     assert response.status_code == 200
#     assert response.json() == {"message": "Car deleted successfully"}