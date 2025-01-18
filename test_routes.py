import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_analyze_endpoint(client):
    # Test case for valid input
    response = client.post('/analyze', json={'prompt': 'LA fires'})
    assert response.status_code == 200
    data = response.get_json()
    assert 'right_wing' in data
    assert 'left_wing' in data

def test_analyze_endpoint_invalid(client):
    # Test case for missing input
    response = client.post('/analyze', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
