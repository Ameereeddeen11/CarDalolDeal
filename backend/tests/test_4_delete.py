from .test_1_create import login_user, client

# Test delete advertisement
def test_delete_seller():
    response = client.delete(
        "/seller/delete/car/1/",
        headers={"Authorization": f"bearer {login_user()}"}
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Car deleted successfully"}

# Test delete user
def test_delete_user():
    response = client.delete(
        "/user/delete/",
        headers={"Authorization": f"bearer {login_user()}"}
    )
    assert response.status_code == 200
    assert response.json() == {"message": "User deleted successfully"}