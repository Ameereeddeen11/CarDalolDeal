from .test_1_create import login_user, client

get_data = [
    {
        'id': 1, 
        'user': {
            'id': 1,
            'username': 'testusername', 
            'firstname': 'testfirstname',
            'lastname': 'testlastname',
            'email': 'test@test.com'
        }, 
        'price': 9700000, 
        'min_price': 9500000, 
        'sold': False, 
        'car': {
            'id': 1,
            'name': 'hi',
            'brand': 'Mercedes', 
            'model': 'Class G', 
            'type': 'Personal', 
            'fuel': 'Diesel', 
            'tachometer': 50, 
            'made_at': 2022, 
            'description': 'hi',
            'car_body': 'SUV', 
            'gearbox': 'Automatic', 
            'power': 588, 
            'place_of_sale': 'hi', 
            'country': 'Germany', 
            'history': 'hi'
        },
        'images': [
            'test_image.jpg'
        ]
    }
]

# Test user information
def test_read_user():
    response = client.get(
        "/auth/user/",
        headers={"Authorization": f"Bearer {login_user()}"}
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "username": "testusername",
        "firstname": "testfirstname",
        "lastname": "testlastname",
        "email": "test@test.com"
    }

# Test all advertisements
def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == get_data

# Test advertisement from users with id 1
def test_read_advertise_seller():
    response = client.get(
        "/seller/advertise/",
        headers={"Authorization": f"Bearer {login_user()}"}
    )
    assert response.status_code == 200
    assert response.json() == get_data

# Test advertisement with id 1
def test_read_seller():
    response = client.get("/seller/1")
    assert response.status_code == 200
    assert response.json() == get_data

# Test 