from fastapi.testclient import TestClient
from .test_2_seller import datas, login_user
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == [{
        'id': 1, 
        'user': {
            'name': 'test', 
            'email': 'test@test.com'
        }, 
        'price': 9700000, 
        'min_price': 9500000, 
        'sold': False, 
        'car': {
            'brand': 'Mercedes', 
            'model': 'Class G', 
            'type': 'Personal', 
            'fuel': 'Diesel', 
            'tachometer': 50, 
            'made_at': 2022, 
            'car_body': 'SUV', 
            'gearbox': 'Automatic', 
            'power': 588, 
            'place_of_sale': 'hi', 
            'country': 'Germany', 
            'history': 'hi'
        }
    }]

def test_delete_seller():
    response = client.delete(
        "/seller/delete/car/1/",
        headers={"Authorization": f"bearer {login_user()}"}
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Car deleted successfully"}