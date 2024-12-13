from .test_1_create import client, login_after_update

# Test delete advertisement
def test_delete_seller():
    response = client.delete(
        "/seller/delete/car/1/",
        headers={"Authorization": f"Bearer {login_after_update()}"}
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Car deleted successfully"}

# Test delete user
def test_delete_user():
    response = client.delete(
        "/auth/delete/",
        headers={"Authorization": f"Bearer {login_after_update()}"}
    )
    assert response.status_code == 200
    assert response.json() == {"message": "User deleted successfully"}