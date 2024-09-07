from .test_1_create import client, login_after_update

# Test update user
def test_update_user():
    response = client.put(
        "/auth/update/1/",
        headers={"Authorization": f"Bearer {login_after_update()}"},
        json={
            "username": "updatedtest",
            "firstname": "updatedfirstname",
            "lastname": "updatedlastname",
            "email": "update@test.com"
        }
    )
    assert response.status_code == 200
    assert response.json() == {"message": "User updated successfully"}

# Test update user password
def test_update_password():
    response = client.put(
        "/auth/update/password/1/",
        headers={"Authorization": f"Bearer {login_after_update()}"},
        json={
            "old_password": "password",
            "password": "newpassword"
        }
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Password updated successfully"}