import enum
from datetime import datetime, date
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    DateTime,
    ForeignKey,
    Numeric,
    Enum as SQLEnum,
    func,
    Index,
)
from sqlalchemy.orm import relationship
from app.db.database import Base


class ApplicationStatus(str, enum.Enum):
    APPLIED = "Applied"
    INTERVIEW = "Interview"
    TECHNICAL_ROUND = "Technical Round"
    OFFER = "Offer"
    REJECTED = "Rejected"


class InterviewType(str, enum.Enum):
    PHONE_SCREEN = "Phone Screen"
    HR_INTERVIEW = "HR Interview"
    TECHNICAL_INTERVIEW = "Technical Interview"
    MANAGERIAL_INTERVIEW = "Managerial Interview"
    FINAL_INTERVIEW = "Final Interview"
    OTHER = "Other"


class SalaryPeriod(str, enum.Enum):
    ANNUAL = "Annual"
    MONTHLY = "Monthly"
    HOURLY = "Hourly"


class Currency(str, enum.Enum):
    INR = "INR"
    USD = "USD"
    EUR = "EUR"
    GBP = "GBP"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationship to user's job applications
    applications = relationship(
        "Application",
        back_populates="user",
        cascade="all, delete-orphan",
        order_by="desc(Application.application_date)",
    )

    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', full_name='{self.full_name}')>"


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    company_name = Column(String(100), nullable=False, index=True)
    position = Column(String(100), nullable=False, index=True)
    location = Column(String(100), nullable=True)
    job_url = Column(String(500), nullable=True)
    
    # Compensation
    salary = Column(Numeric(12, 2), nullable=True)
    salary_period = Column(
        SQLEnum(SalaryPeriod, values_callable=lambda obj: [e.value for e in obj]),
        nullable=True,
        default=SalaryPeriod.ANNUAL,
    )
    currency = Column(
        SQLEnum(Currency, values_callable=lambda obj: [e.value for e in obj]),
        nullable=False,
        default=Currency.INR,
    )
    
    # Dates & Status
    application_date = Column(Date, nullable=False, default=date.today, index=True)
    status = Column(
        SQLEnum(ApplicationStatus, values_callable=lambda obj: [e.value for e in obj]),
        nullable=False,
        default=ApplicationStatus.APPLIED,
        index=True,
    )
    
    # Interview tracking
    interview_date = Column(Date, nullable=True)
    interview_type = Column(
        SQLEnum(InterviewType, values_callable=lambda obj: [e.value for e in obj]),
        nullable=True,
    )
    
    notes = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships
    user = relationship("User", back_populates="applications")
    status_history = relationship(
        "ApplicationStatusHistory",
        back_populates="application",
        cascade="all, delete-orphan",
        order_by="asc(ApplicationStatusHistory.changed_at)",
    )

    # Composite Index for frequent multi-column queries
    __table_args__ = (
        Index("ix_applications_user_status", "user_id", "status"),
        Index("ix_applications_user_date", "user_id", "application_date"),
    )

    def __repr__(self):
        return (
            f"<Application(id={self.id}, company='{self.company_name}', "
            f"position='{self.position}', status='{self.status}')>"
        )


class ApplicationStatusHistory(Base):
    __tablename__ = "application_status_history"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    application_id = Column(
        Integer,
        ForeignKey("applications.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    from_status = Column(
        SQLEnum(ApplicationStatus, values_callable=lambda obj: [e.value for e in obj]),
        nullable=True,
    )
    to_status = Column(
        SQLEnum(ApplicationStatus, values_callable=lambda obj: [e.value for e in obj]),
        nullable=False,
    )
    notes = Column(String(500), nullable=True)
    changed_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationship back to application
    application = relationship("Application", back_populates="status_history")

    def __repr__(self):
        return (
            f"<StatusHistory(app_id={self.application_id}, "
            f"from='{self.from_status}' -> to='{self.to_status}')>"
        )
