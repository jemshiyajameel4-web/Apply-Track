from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.db.models import User
from app.schemas.auth import RegisterRequest, LoginRequest
from app.schemas.user import UserUpdate, UserPasswordUpdate
from app.core.security import get_password_hash, verify_password, create_access_token


class AuthService:
    @staticmethod
    def register(db: Session, request: RegisterRequest) -> dict:
        existing_user = db.query(User).filter(User.email == request.email.lower()).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An account with this email address already exists.",
            )

        hashed_pw = get_password_hash(request.password)
        new_user = User(
            full_name=request.full_name.strip(),
            email=request.email.lower().strip(),
            password_hash=hashed_pw,
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        token = create_access_token(subject=str(new_user.id))
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": new_user,
        }

    @staticmethod
    def login(db: Session, request: LoginRequest) -> dict:
        user = db.query(User).filter(User.email == request.email.lower().strip()).first()
        if not user or not verify_password(request.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password.",
            )

        token = create_access_token(subject=str(user.id))
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
        }

    @staticmethod
    def update_profile(db: Session, user: User, update_data: UserUpdate) -> User:
        if update_data.email and update_data.email.lower() != user.email:
            existing = db.query(User).filter(User.email == update_data.email.lower()).first()
            if existing and existing.id != user.id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email is already taken by another account.",
                )
            user.email = update_data.email.lower().strip()

        if update_data.full_name:
            user.full_name = update_data.full_name.strip()

        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def change_password(db: Session, user: User, pw_data: UserPasswordUpdate) -> dict:
        if not verify_password(pw_data.current_password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect.",
            )

        user.password_hash = get_password_hash(pw_data.new_password)
        db.commit()
        return {"detail": "Password updated successfully."}
