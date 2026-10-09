from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import Base, engine
from app.routers import auth, users, applications, dashboard

# Ensure tables exist on startup if not already created by alembic
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ApplyTrack API",
    description="REST API for ApplyTrack - Job Application Tracker",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(applications.router)
app.include_router(dashboard.router)


@app.get("/", tags=["Health"])
def root():
    return {
        "name": "ApplyTrack API",
        "status": "healthy",
        "version": settings.VERSION,
        "docs": "/docs",
    }


@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "service": "ApplyTrack Backend",
        "version": settings.VERSION,
    }
