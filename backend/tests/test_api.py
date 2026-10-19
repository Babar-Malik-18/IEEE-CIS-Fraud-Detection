import json
from pathlib import Path
import pytest
from backend.app import app

ROOT = Path(__file__).resolve().parent.parent.parent


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def valid_payload():
    payload_file = ROOT / "backend" / "test_payload.json"
    with open(payload_file, "r", encoding="utf-8") as f:
        return json.load(f)


def test_health_returns_ok(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "ok"
    assert data["features"] == 68
    assert data["task"] == "classification"


def test_predict_valid_payload(client, valid_payload):
    response = client.post("/predict", json=valid_payload)
    assert response.status_code == 200
    data = response.get_json()
    assert "prediction" in data
    assert data["prediction"] in [0, 1]
    assert "probabilities" in data
    assert len(data["probabilities"]) == 2
    assert "disclaimer" in data


def test_predict_missing_feature_fails(client, valid_payload):
    payload = valid_payload.copy()
    first_key = list(payload.keys())[0]
    del payload[first_key]
    response = client.post("/predict", json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert "missing" in data
    assert first_key in data["missing"]


def test_predict_extra_feature_fails(client, valid_payload):
    payload = valid_payload.copy()
    payload["unrecognized_extra_feature"] = 999.0
    response = client.post("/predict", json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    assert "extra" in data
    assert "unrecognized_extra_feature" in data["extra"]
