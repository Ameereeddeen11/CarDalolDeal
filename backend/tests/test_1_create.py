from fastapi.testclient import TestClient
from main import app
import io

client = TestClient(app)

post_data = {
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

# Test user registration
def test_user_registration():
    response = client.post(
        "/auth/register/",
        json={
            "username": "testusername",
            "firstname": "testfirstname",
            "lastname": "testlastname",
            "email": "test@test.com",
            "password": "password"
        }
    )
    assert response.status_code == 201
    assert response.json() == {
        "username": "testusername",
        "email": "test@test.com"
    }

# Test user login
def test_user_login():
    response = client.post(
        "/auth/login/",
        data={
            "username": "testusername",
            "password": "password"
        }
    )
    assert response.status_code == 200

# Base function for user login
def login(data):
    response = client.post(
        "/auth/login/",
        data=data
    )
    return response.json()["access_token"]

# Test user login
def login_user():
    data = {
        "username": "testusername",
        "password": "password"
    }
    login(data)

# Test login with new username  
def login_username():
    data = {
        "username": "updatedtest",
        "password": "password"
    }
    login(data)

# Test login with new password
def login_after_update():
    data = {
        "username": "updatedtest",
        "password": "newpassword"
    }
    login_user(data)

# Test user logout
# def test_user_logout():
#     response = client.post(
#         "/auth/logout/",
#         headers={"Authorization": f"bearer {login_user()}"}
#     )
#     assert response.status_code == 200
#     assert response.json() == {"message": "Successfully logged out"}

# Test create car
def test_create_seller():
    response = client.post(
        "/seller/add_car/", 
        headers={"Authorization": f"Bearer {login_user()}"},
        data = post_data,
        files={
            "images": (
                "test_image.jpg",
                io.BytesIO(b"fake image data"),
                "image/jpeg"
            )
        }
    )
    assert response.status_code == 201