from datetime import date, datetime
from typing import Optional, List
from pydantic import BaseModel, Field, HttpUrl, field_validator
from app.db.models import ApplicationStatus, InterviewType, SalaryPeriod, Currency


class StatusHistoryResponse(BaseModel):
    id: int
    from_status: Optional[ApplicationStatus] = None
    to_status: ApplicationStatus
    notes: Optional[str] = None
    changed_at: datetime

    class Config:
        from_attributes = True


class ApplicationBase(BaseModel):
    company_name: str = Field(..., min_length=1, max_length=100)
    position: str = Field(..., min_length=1, max_length=100)
    location: Optional[str] = Field(None, max_length=100)
    job_url: Optional[str] = Field(None, max_length=500)
    salary: Optional[float] = Field(None, ge=0)
    salary_period: Optional[SalaryPeriod] = SalaryPeriod.ANNUAL
    currency: Optional[Currency] = Currency.INR
    application_date: date = Field(default_factory=date.today)
    status: ApplicationStatus = ApplicationStatus.APPLIED
    interview_date: Optional[date] = None
    interview_type: Optional[InterviewType] = None
    notes: Optional[str] = Field(None, max_length=2000)

    @field_validator("job_url")
    @classmethod
    def validate_job_url(cls, v: Optional[str]) -> Optional[str]:
        if v and not (v.startswith("http://") or v.startswith("https://")):
            raise ValueError("Job URL must start with http:// or https://")
        return v


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(BaseModel):
    company_name: Optional[str] = Field(None, min_length=1, max_length=100)
    position: Optional[str] = Field(None, min_length=1, max_length=100)
    location: Optional[str] = Field(None, max_length=100)
    job_url: Optional[str] = Field(None, max_length=500)
    salary: Optional[float] = Field(None, ge=0)
    salary_period: Optional[SalaryPeriod] = None
    currency: Optional[Currency] = None
    application_date: Optional[date] = None
    status: Optional[ApplicationStatus] = None
    interview_date: Optional[date] = None
    interview_type: Optional[InterviewType] = None
    notes: Optional[str] = Field(None, max_length=2000)

    @field_validator("job_url")
    @classmethod
    def validate_job_url(cls, v: Optional[str]) -> Optional[str]:
        if v and not (v.startswith("http://") or v.startswith("https://")):
            raise ValueError("Job URL must start with http:// or https://")
        return v


class ApplicationResponse(ApplicationBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    status_history: List[StatusHistoryResponse] = []

    class Config:
        from_attributes = True


class PaginatedApplicationsResponse(BaseModel):
    items: List[ApplicationResponse]
    total: int
    page: int
    limit: int
    total_pages: int
