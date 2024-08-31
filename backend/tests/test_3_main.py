from .test_1_auth import client
from .test_2_seller import datas

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == datas

