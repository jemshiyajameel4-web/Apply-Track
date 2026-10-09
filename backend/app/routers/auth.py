from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.models import User
from app.schemas.auth import RegisterRequest, LoginRequest, Token
from app.schemas.user import UserResponse
from app.services.auth_service import AuthService
from app.dependencies.auth import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=dict,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    description="Creates a new user account with hashed password and returns a JWT access token.",
)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    result = AuthService.register(db, request)
    return {
        "access_token": result["access_token"],
        "token_type": result["token_type"],
        "user": UserResponse.model_validate(result["user"]),
    }


@router.post(
    "/login",
    response_model=dict,
    summary="Authenticate user and obtain JWT",
    description="Validates credentials and returns a signed JWT bearer token.",
)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    result = AuthService.login(db, request)
    return {
        "access_token": result["access_token"],
        "token_type": result["token_type"],
        "user": UserResponse.model_validate(result["user"]),
    }


@router.post(
    "/logout",
    summary="Logout user",
    description="Stateless logout hook for client token invalidation.",
)
def logout(current_user: User = Depends(get_current_user)):
    return {"detail": "Successfully logged out"}


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user info",
    description="Retrieves profile information for the authenticated user.",
)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
