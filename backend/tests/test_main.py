from main import app
from fastapi.testclient import TestClient
from response.sellerResponse import SellerReponse

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    