from typing import List, Dict, Any
from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import func, desc, asc, and_
from app.db.models import Application, ApplicationStatus, User
from app.schemas.dashboard import (
    DashboardStatsResponse,
    UpcomingInterviewItem,
    StatusDistributionItem,
)


class DashboardService:
    @staticmethod
    def get_stats(db: Session, user: User) -> DashboardStatsResponse:
        # Aggregate counts by status for this user
        status_counts = (
            db.query(Application.status, func.count(Application.id))
            .filter(Application.user_id == user.id)
            .group_by(Application.status)
            .all()
        )
        counts_dict = {status.value: count for status, count in status_counts}

        applied_count = counts_dict.get(ApplicationStatus.APPLIED.value, 0)
        interview_count = counts_dict.get(ApplicationStatus.INTERVIEW.value, 0)
        technical_round_count = counts_dict.get(ApplicationStatus.TECHNICAL_ROUND.value, 0)
        offer_count = counts_dict.get(ApplicationStatus.OFFER.value, 0)
        rejected_count = counts_dict.get(ApplicationStatus.REJECTED.value, 0)

        total_applications = (
            applied_count
            + interview_count
            + technical_round_count
            + offer_count
            + rejected_count
        )

        # Count upcoming interviews (interview_date is scheduled on or after today, or in active interview stage)
        today = date.today()
        upcoming_interviews_count = (
            db.query(func.count(Application.id))
            .filter(
                Application.user_id == user.id,
                Application.interview_date != None,
                Application.interview_date >= today,
                Application.status.in_([ApplicationStatus.INTERVIEW, ApplicationStatus.TECHNICAL_ROUND]),
            )
            .scalar()
            or 0
        )

        # Calculate rates accurately with division-by-zero guards
        interview_candidates = interview_count + technical_round_count + offer_count
        interview_rate = (
            round((interview_candidates / total_applications) * 100, 1)
            if total_applications > 0
            else 0.0
        )
        offer_rate = (
            round((offer_count / total_applications) * 100, 1)
            if total_applications > 0
            else 0.0
        )

        return DashboardStatsResponse(
            total_applications=total_applications,
            applied_count=applied_count,
            interview_count=interview_count,
            technical_round_count=technical_round_count,
            offer_count=offer_count,
            rejected_count=rejected_count,
            upcoming_interviews_count=upcoming_interviews_count,
            interview_rate=interview_rate,
            offer_rate=offer_rate,
        )

    @staticmethod
    def get_status_distribution(db: Session, user: User) -> List[StatusDistributionItem]:
        stats = DashboardService.get_stats(db, user)
        return [
            StatusDistributionItem(
                name="Applied",
                status=ApplicationStatus.APPLIED,
                count=stats.applied_count,
                color="#4F46E5",  # Brand Indigo
            ),
            StatusDistributionItem(
                name="Interview",
                status=ApplicationStatus.INTERVIEW,
                count=stats.interview_count,
                color="#9333EA",  # Purple
            ),
            StatusDistributionItem(
                name="Technical Round",
                status=ApplicationStatus.TECHNICAL_ROUND,
                count=stats.technical_round_count,
                color="#EA580C",  # Orange
            ),
            StatusDistributionItem(
                name="Offer",
                status=ApplicationStatus.OFFER,
                count=stats.offer_count,
                color="#16A34A",  # Green
            ),
            StatusDistributionItem(
                name="Rejected",
                status=ApplicationStatus.REJECTED,
                count=stats.rejected_count,
                color="#DC2626",  # Red
            ),
        ]

    @staticmethod
    def get_recent_applications(db: Session, user: User, limit: int = 5) -> List[Application]:
        return (
            db.query(Application)
            .filter(Application.user_id == user.id)
            .order_by(desc(Application.updated_at), desc(Application.id))
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_upcoming_interviews(db: Session, user: User, limit: int = 5) -> List[Application]:
        today = date.today()
        return (
            db.query(Application)
            .filter(
                Application.user_id == user.id,
                Application.interview_date != None,
                Application.interview_date >= today,
                Application.status.in_([ApplicationStatus.INTERVIEW, ApplicationStatus.TECHNICAL_ROUND]),
            )
            .order_by(asc(Application.interview_date))
            .limit(limit)
            .all()
        )
