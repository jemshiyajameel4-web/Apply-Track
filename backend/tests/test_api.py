import pytest
from datetime import date
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.database import Base, get_db

from sqlalchemy.pool import StaticPool

TEST_DB_URL = "sqlite:///:memory:"
engine = create_engine(
    TEST_DB_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
def setup_database():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


client = TestClient(app)


def test_auth_registration_and_login():
    # 1. Register new user
    reg_payload = {
        "full_name": "David Miller",
        "email": "david@example.com",
        "password": "Password123",
        "confirm_password": "Password123",
    }
    reg_res = client.post("/api/auth/register", json=reg_payload)
    assert reg_res.status_code == 201
    reg_data = reg_res.json()
    assert "access_token" in reg_data
    assert reg_data["user"]["email"] == "david@example.com"
    token = reg_data["access_token"]

    # 2. Duplicate registration should fail
    dup_res = client.post("/api/auth/register", json=reg_payload)
    assert dup_res.status_code == 400

    # 3. Login with credentials
    login_res = client.post(
        "/api/auth/login",
        json={"email": "david@example.com", "password": "Password123"},
    )
    assert login_res.status_code == 200
    assert "access_token" in login_res.json()

    # 4. Access protected /api/auth/me
    headers = {"Authorization": f"Bearer {token}"}
    me_res = client.get("/api/auth/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["full_name"] == "David Miller"


def test_application_crud_and_user_isolation():
    # Register User A
    user_a = client.post(
        "/api/auth/register",
        json={
            "full_name": "User A",
            "email": "usera@example.com",
            "password": "Password123",
            "confirm_password": "Password123",
        },
    ).json()
    headers_a = {"Authorization": f"Bearer {user_a['access_token']}"}

    # Register User B
    user_b = client.post(
        "/api/auth/register",
        json={
            "full_name": "User B",
            "email": "userb@example.com",
            "password": "Password123",
            "confirm_password": "Password123",
        },
    ).json()
    headers_b = {"Authorization": f"Bearer {user_b['access_token']}"}

    # Create application for User A
    app_payload = {
        "company_name": "Netflix",
        "position": "Senior UI Engineer",
        "location": "Los Gatos, CA",
        "job_url": "https://jobs.netflix.com/1",
        "salary": 200000,
        "salary_period": "Annual",
        "currency": "USD",
        "application_date": "2026-10-01",
        "status": "Applied",
        "notes": "Referral from teammate.",
    }
    create_res = client.post("/api/applications", json=app_payload, headers=headers_a)
    assert create_res.status_code == 201
    app_id = create_res.json()["id"]

    # User A can get their application
    get_res = client.get(f"/api/applications/{app_id}", headers=headers_a)
    assert get_res.status_code == 200
    assert get_res.json()["company_name"] == "Netflix"

    # User B CANNOT get User A's application (Strict Isolation)
    iso_res = client.get(f"/api/applications/{app_id}", headers=headers_b)
    assert iso_res.status_code == 404

    # Update application (status -> Interview)
    update_payload = {
        "status": "Interview",
        "interview_date": "2026-10-15",
        "interview_type": "Technical Interview",
    }
    update_res = client.put(
        f"/api/applications/{app_id}", json=update_payload, headers=headers_a
    )
    assert update_res.status_code == 200
    updated_app = update_res.json()
    assert updated_app["status"] == "Interview"
    assert len(updated_app["status_history"]) == 2

    # Check Dashboard Stats for User A
    stats_res = client.get("/api/dashboard/stats", headers=headers_a)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_applications"] == 1
    assert stats["interview_count"] == 1
    assert stats["interview_rate"] == 100.0

    # User B's dashboard stats should remain zero
    stats_b = client.get("/api/dashboard/stats", headers=headers_b).json()
    assert stats_b["total_applications"] == 0

    # Delete application
    del_res = client.delete(f"/api/applications/{app_id}", headers=headers_a)
    assert del_res.status_code == 200
    assert client.get(f"/api/applications/{app_id}", headers=headers_a).status_code == 404
