from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User
from app.schemas.dashboard import (
    DashboardStatsResponse,
    UpcomingInterviewItem,
    StatusDistributionItem,
)
from app.schemas.application import ApplicationResponse
from app.services.dashboard_service import DashboardService
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


@router.get(
    "/stats",
    response_model=DashboardStatsResponse,
    summary="Get aggregated dashboard KPI statistics",
)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_stats(db=db, user=current_user)


@router.get(
    "/status-distribution",
    response_model=List[StatusDistributionItem],
    summary="Get status distribution counts and chart colors",
)
def get_status_distribution(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_status_distribution(db=db, user=current_user)


@router.get(
    "/recent-applications",
    response_model=List[ApplicationResponse],
    summary="Get recent job applications",
)
def get_recent_applications(
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_recent_applications(
        db=db, user=current_user, limit=limit
    )


@router.get(
    "/upcoming-interviews",
    response_model=List[UpcomingInterviewItem],
    summary="Get upcoming scheduled interviews",
)
def get_upcoming_interviews(
    limit: int = Query(5, ge=1, le=20),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return DashboardService.get_upcoming_interviews(
        db=db, user=current_user, limit=limit
    )
