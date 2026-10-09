from typing import Optional, Tuple, List
from math import ceil
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc
from fastapi import HTTPException, status
from app.db.models import Application, ApplicationStatusHistory, ApplicationStatus, User
from app.schemas.application import ApplicationCreate, ApplicationUpdate


class ApplicationService:
    @staticmethod
    def get_applications(
        db: Session,
        user: User,
        page: int = 1,
        limit: int = 10,
        search: Optional[str] = None,
        status: Optional[ApplicationStatus] = None,
        sort: Optional[str] = "newest",
    ) -> Tuple[List[Application], int, int]:
        query = db.query(Application).filter(Application.user_id == user.id)

        # Apply search on company name and position
        if search and search.strip():
            term = f"%{search.strip()}%"
            query = query.filter(
                or_(
                    Application.company_name.ilike(term),
                    Application.position.ilike(term),
                    Application.location.ilike(term),
                )
            )

        # Apply status filter
        if status:
            query = query.filter(Application.status == status)

        # Apply sorting
        if sort == "oldest":
            query = query.order_by(asc(Application.application_date), asc(Application.id))
        elif sort == "company_asc":
            query = query.order_by(asc(Application.company_name))
        elif sort == "company_desc":
            query = query.order_by(desc(Application.company_name))
        else:  # newest by default
            query = query.order_by(desc(Application.application_date), desc(Application.id))

        total = query.count()
        total_pages = ceil(total / limit) if total > 0 else 1

        offset = (page - 1) * limit
        items = query.offset(offset).limit(limit).all()

        return items, total, total_pages

    @staticmethod
    def get_application_by_id(db: Session, application_id: int, user: User) -> Application:
        application = (
            db.query(Application)
            .filter(Application.id == application_id, Application.user_id == user.id)
            .first()
        )
        if not application:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Application not found",
            )
        return application

    @staticmethod
    def create_application(db: Session, data: ApplicationCreate, user: User) -> Application:
        application = Application(
            user_id=user.id,
            company_name=data.company_name.strip(),
            position=data.position.strip(),
            location=data.location.strip() if data.location else None,
            job_url=data.job_url.strip() if data.job_url else None,
            salary=data.salary,
            salary_period=data.salary_period,
            currency=data.currency,
            application_date=data.application_date,
            status=data.status,
            interview_date=data.interview_date,
            interview_type=data.interview_type,
            notes=data.notes.strip() if data.notes else None,
        )
        db.add(application)
        db.commit()
        db.refresh(application)

        # Record initial status in history
        history = ApplicationStatusHistory(
            application_id=application.id,
            from_status=None,
            to_status=application.status,
            notes=f"Application created with status {application.status.value}.",
        )
        db.add(history)
        db.commit()
        db.refresh(application)

        return application

    @staticmethod
    def update_application(
        db: Session, application_id: int, data: ApplicationUpdate, user: User
    ) -> Application:
        application = ApplicationService.get_application_by_id(db, application_id, user)
        old_status = application.status

        update_dict = data.model_dump(exclude_unset=True)
        for key, value in update_dict.items():
            if isinstance(value, str):
                value = value.strip()
            setattr(application, key, value)

        db.commit()
        db.refresh(application)

        # Record status change in timeline if changed
        if data.status and data.status != old_status:
            history = ApplicationStatusHistory(
                application_id=application.id,
                from_status=old_status,
                to_status=data.status,
                notes=f"Status changed from {old_status.value} to {data.status.value}.",
            )
            db.add(history)
            db.commit()
            db.refresh(application)

        return application

    @staticmethod
    def delete_application(db: Session, application_id: int, user: User) -> dict:
        application = ApplicationService.get_application_by_id(db, application_id, user)
        db.delete(application)
        db.commit()
        return {"detail": "Application deleted successfully"}
