import sys
import os
from datetime import date, timedelta
from app.db.database import SessionLocal, Base, engine
from app.db.models import (
    User,
    Application,
    ApplicationStatusHistory,
    ApplicationStatus,
    InterviewType,
    SalaryPeriod,
    Currency,
)
from app.core.security import get_password_hash


def seed():
    print("Seeding development database...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if demo user exists
        demo_user = db.query(User).filter(User.email == "demo@applytrack.io").first()
        if not demo_user:
            demo_user = User(
                full_name="Sarah Jenkins",
                email="demo@applytrack.io",
                password_hash=get_password_hash("Password123"),
            )
            db.add(demo_user)
            db.commit()
            db.refresh(demo_user)
            print(f"Created demo user: demo@applytrack.io / Password123")
        else:
            print("Demo user already exists.")

        # Check existing applications
        existing_apps = db.query(Application).filter(Application.user_id == demo_user.id).count()
        if existing_apps == 0:
            today = date.today()
            sample_apps = [
                {
                    "company_name": "Google",
                    "position": "Frontend Engineer",
                    "location": "Mountain View, CA (Hybrid)",
                    "job_url": "https://careers.google.com/jobs/results/123",
                    "salary": 165000,
                    "salary_period": SalaryPeriod.ANNUAL,
                    "currency": Currency.USD,
                    "application_date": today - timedelta(days=18),
                    "status": ApplicationStatus.INTERVIEW,
                    "interview_date": today + timedelta(days=4),
                    "interview_type": InterviewType.TECHNICAL_INTERVIEW,
                    "notes": "Completed initial screening. System design & React deep dive scheduled.",
                },
                {
                    "company_name": "Stripe",
                    "position": "Full Stack Developer",
                    "location": "Remote",
                    "job_url": "https://stripe.com/jobs/456",
                    "salary": 155000,
                    "salary_period": SalaryPeriod.ANNUAL,
                    "currency": Currency.USD,
                    "application_date": today - timedelta(days=12),
                    "status": ApplicationStatus.TECHNICAL_ROUND,
                    "interview_date": today + timedelta(days=2),
                    "interview_type": InterviewType.TECHNICAL_INTERVIEW,
                    "notes": "Take-home project passed. Pair programming interview next.",
                },
                {
                    "company_name": "Linear",
                    "position": "Product Engineer",
                    "location": "Remote (Global)",
                    "job_url": "https://linear.app/careers",
                    "salary": 140000,
                    "salary_period": SalaryPeriod.ANNUAL,
                    "currency": Currency.USD,
                    "application_date": today - timedelta(days=8),
                    "status": ApplicationStatus.OFFER,
                    "interview_date": None,
                    "interview_type": None,
                    "notes": "Received formal offer letter! Reviewing equity package and benefits.",
                },
                {
                    "company_name": "Microsoft",
                    "position": "Software Engineer II",
                    "location": "Redmond, WA",
                    "job_url": "https://careers.microsoft.com",
                    "salary": 148000,
                    "salary_period": SalaryPeriod.ANNUAL,
                    "currency": Currency.USD,
                    "application_date": today - timedelta(days=25),
                    "status": ApplicationStatus.REJECTED,
                    "interview_date": None,
                    "interview_type": None,
                    "notes": "Received rejection email after 3 weeks. Re-apply in 6 months.",
                },
                {
                    "company_name": "Vercel",
                    "position": "Next.js Solutions Architect",
                    "location": "Remote",
                    "job_url": "https://vercel.com/careers",
                    "salary": 160000,
                    "salary_period": SalaryPeriod.ANNUAL,
                    "currency": Currency.USD,
                    "application_date": today - timedelta(days=3),
                    "status": ApplicationStatus.APPLIED,
                    "interview_date": None,
                    "interview_type": None,
                    "notes": "Submitted referral application through college alumni network.",
                },
                {
                    "company_name": "Figma",
                    "position": "UI/UX Software Engineer",
                    "location": "San Francisco, CA",
                    "job_url": "https://figma.com/careers",
                    "salary": 150000,
                    "salary_period": SalaryPeriod.ANNUAL,
                    "currency": Currency.USD,
                    "application_date": today - timedelta(days=5),
                    "status": ApplicationStatus.APPLIED,
                    "interview_date": None,
                    "interview_type": None,
                    "notes": "Applied via LinkedIn job board with custom portfolio link.",
                },
            ]

            for item in sample_apps:
                app = Application(user_id=demo_user.id, **item)
                db.add(app)
                db.commit()
                db.refresh(app)

                history = ApplicationStatusHistory(
                    application_id=app.id,
                    from_status=None,
                    to_status=app.status,
                    notes=f"Application recorded as {app.status.value}.",
                )
                db.add(history)
                db.commit()

            print(f"Added {len(sample_apps)} sample applications for demo user.")
        else:
            print(f"User already has {existing_apps} applications.")

    finally:
        db.close()


if __name__ == "__main__":
    seed()
