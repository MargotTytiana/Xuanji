from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import ORJSONResponse

from .core.config import get_settings
from .core.database import engine, Base
from .api.v1 import divination, tarot, bagua, user, checkin

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialise database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown: release connection pool
    await engine.dispose()


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    debug=settings.DEBUG,
    default_response_class=ORJSONResponse,  # faster JSON serialisation
    lifespan=lifespan,
    docs_url="/docs" if settings.DEBUG else None,   # hide docs in production
    redoc_url="/redoc" if settings.DEBUG else None,
)

# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)


# --- Routers ---
V1 = "/api/v1"

app.include_router(user.router,       prefix=f"{V1}/user",       tags=["user"])
app.include_router(checkin.router,    prefix=f"{V1}/checkin",    tags=["checkin"])
app.include_router(divination.router, prefix=f"{V1}/divination", tags=["divination"])
app.include_router(tarot.router,      prefix=f"{V1}/tarot",      tags=["tarot"])
app.include_router(bagua.router,      prefix=f"{V1}/bagua",      tags=["bagua"])


# --- Health check ---
@app.get("/health", tags=["system"])
async def health():
    return {"status": "ok", "version": settings.APP_VERSION}