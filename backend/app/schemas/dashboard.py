from typing import List, Optional
from datetime import date
from pydantic import BaseModel
from app.db.models import ApplicationStatus, InterviewType
from app.schemas.application import ApplicationResponse


class DashboardStatsResponse(BaseModel):
    total_applications: int
    applied_count: int
    interview_count: int
    technical_round_count: int
    offer_count: int
    rejected_count: int
    upcoming_interviews_count: int
    interview_rate: float  # (Interview + Technical Round) / Total * 100
    offer_rate: float      # Offer / Total * 100


class UpcomingInterviewItem(BaseModel):
    id: int
    company_name: str
    position: str
    location: Optional[str] = None
    interview_date: date
    interview_type: Optional[InterviewType] = None
    status: ApplicationStatus

    class Config:
        from_attributes = True


class StatusDistributionItem(BaseModel):
    name: str
    status: ApplicationStatus
    count: int
    color: str
