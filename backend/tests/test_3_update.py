from .test_1_create import login_user, client

# Test update user
def test_update_user():
    response = client.put(
        "/auth/update/1/",
        headers={"Authorization": f"bearer {login_user()}"},
        json={
            "username": "updatedtest"
        }
    )
    assert response.status_code == 200
    assert response.json() == {"message": "User updated successfully"}

# Test update user password
def test_update_password():
    response = client.put(
        "/auth/update/password/1/",
        headers={"Authorization": f"bearer {login_user()}"},
        json={
            "old_password": "password",
            "password": "newpassword"
        }
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Password updated successfully"}