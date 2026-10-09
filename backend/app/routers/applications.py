from typing import Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User, ApplicationStatus
from app.schemas.application import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse,
    PaginatedApplicationsResponse,
)
from app.services.application_service import ApplicationService
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/api/applications", tags=["Applications"])


@router.get(
    "",
    response_model=PaginatedApplicationsResponse,
    summary="List applications with pagination, search, and filtering",
)
def get_applications(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    search: Optional[str] = Query(None, description="Search term for company or position"),
    status: Optional[ApplicationStatus] = Query(None, description="Filter by status"),
    sort: Optional[str] = Query("newest", description="Sort order (newest, oldest, company_asc, company_desc)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    items, total, total_pages = ApplicationService.get_applications(
        db=db,
        user=current_user,
        page=page,
        limit=limit,
        search=search,
        status=status,
        sort=sort,
    )
    return PaginatedApplicationsResponse(
        items=items,
        total=total,
        page=page,
        limit=limit,
        total_pages=total_pages,
    )


@router.post(
    "",
    response_model=ApplicationResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new job application",
)
def create_application(
    application_data: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ApplicationService.create_application(
        db=db, data=application_data, user=current_user
    )


@router.get(
    "/{application_id}",
    response_model=ApplicationResponse,
    summary="Get single application details by ID",
)
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ApplicationService.get_application_by_id(
        db=db, application_id=application_id, user=current_user
    )


@router.put(
    "/{application_id}",
    response_model=ApplicationResponse,
    summary="Update application details",
)
def update_application(
    application_id: int,
    application_data: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ApplicationService.update_application(
        db=db,
        application_id=application_id,
        data=application_data,
        user=current_user,
    )


@router.delete(
    "/{application_id}",
    summary="Delete an application",
)
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ApplicationService.delete_application(
        db=db, application_id=application_id, user=current_user
    )
