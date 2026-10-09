import pytest
from datetime import date, datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.db.models import (
    Base,
    User,
    Application,
    ApplicationStatusHistory,
    ApplicationStatus,
    InterviewType,
    SalaryPeriod,
    Currency,
)

from sqlalchemy.pool import StaticPool

# Test in-memory SQLite engine
TEST_DB_URL = "sqlite:///:memory:"
engine = create_engine(
    TEST_DB_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



@pytest.fixture(scope="function")
def db_session():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)


def test_create_user_and_application(db_session):
    # Create test user
    user = User(
        full_name="Alex Mercer",
        email="alex@example.com",
        password_hash="hashed_pw_123",
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)

    assert user.id is not None
    assert user.full_name == "Alex Mercer"

    # Create application for user
    app = Application(
        user_id=user.id,
        company_name="Acme Corp",
        position="Senior Backend Engineer",
        location="Remote",
        job_url="https://acme.com/jobs/101",
        salary=150000.00,
        salary_period=SalaryPeriod.ANNUAL,
        currency=Currency.USD,
        application_date=date(2026, 10, 1),
        status=ApplicationStatus.INTERVIEW,
        interview_date=date(2026, 10, 15),
        interview_type=InterviewType.TECHNICAL_INTERVIEW,
        notes="First round scheduled with engineering lead.",
    )
    db_session.add(app)
    db_session.commit()
    db_session.refresh(app)

    assert app.id is not None
    assert app.user_id == user.id
    assert len(user.applications) == 1
    assert user.applications[0].company_name == "Acme Corp"
    assert app.status == ApplicationStatus.INTERVIEW

    # Add status history
    history = ApplicationStatusHistory(
        application_id=app.id,
        from_status=ApplicationStatus.APPLIED,
        to_status=ApplicationStatus.INTERVIEW,
        notes="Moved from Applied to Interview after recruiter call.",
    )
    db_session.add(history)
    db_session.commit()
    db_session.refresh(app)

    assert len(app.status_history) == 1
    assert app.status_history[0].to_status == ApplicationStatus.INTERVIEW


def test_cascade_delete_user(db_session):
    user = User(
        full_name="Jane Doe",
        email="jane@example.com",
        password_hash="hashed_pw_456",
    )
    db_session.add(user)
    db_session.commit()

    app = Application(
        user_id=user.id,
        company_name="Tech Solutions",
        position="Frontend Developer",
        status=ApplicationStatus.APPLIED,
    )
    db_session.add(app)
    db_session.commit()

    assert db_session.query(Application).count() == 1

    # Delete user and verify cascading deletion
    db_session.delete(user)
    db_session.commit()

    assert db_session.query(User).count() == 0
    assert db_session.query(Application).count() == 0
