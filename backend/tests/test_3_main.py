from fastapi.testclient import TestClient
from .test_2_seller import datas, login_user
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    # assert response.json() == datas

def test_delete_seller():
    response = client.delete(
        "/seller/delete/car/1/",
        headers={"Authorization": f"bearer {login_user()}"}
    )
    assert response.status_code == 200
    assert response.json() == {"message": "Car deleted successfully"}