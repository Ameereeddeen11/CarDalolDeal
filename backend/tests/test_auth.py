from .test_main import client

# def test_user_registration():
#     response = client.post(
#         "/auth/register/",
#         json={
#             "username": "test",
#             "fistname": "testfirstname",
#             "lastname": "testlastname",
#             "email": "test@test.com",
#             "password": "bUeN0"
#         }
#     )
#     assert response.status_code == 201
#     assert response.json() == {
#         "username": "test",
#         "fistname": "testfirstname",
#         "lastname": "testlastname",
#         "email": "test@test.com",
#         "password": "bUeN0"
#     }

def test_user_login():
    response = client.post(
        "/auth/login/",
        data={
            "username": "test",
            "password": "bUeN0"
        }
    )
    assert response.status_code == 200

def login_user():
    response = client.post(
        "/auth/login/",
        data={
            "username": "test",
            "password": "bUeN0"
        }
    )
    return response.json()["access_token"]