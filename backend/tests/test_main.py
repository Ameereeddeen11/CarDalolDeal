from main import app
from fastapi.testclient import TestClient
client = TestClient(app)

def test_read_main():
    response = client.get("/")
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