from pydantic_settings import BaseSettings
from pydantic import field_validator
from functools import lru_cache
from typing import List
import secrets


class Settings(BaseSettings):

    # --- App ---
    APP_NAME: str = "玄機 · Xuan Ji API"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False

    # --- CORS ---
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    # --- Anthropic ---
    ANTHROPIC_API_KEY: str
    AI_MODEL: str = "claude-opus-4-5"
    AI_MAX_TOKENS: int = 1024
    AI_TEMPERATURE: float = 0.9  # higher = more mystical variation

    # --- Database ---
    DATABASE_URL: str
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20

    # --- Redis ---
    REDIS_URL: str = "redis://localhost:6379/0"
    CACHE_TTL_SECONDS: int = 60 * 60 * 24  # 24h default

    # --- Auth ---
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    # --- Rate limiting ---
    MAX_READINGS_PER_DAY: int = 10  # free tier cap

    # --- i18n ---
    SUPPORTED_LANGUAGES: List[str] = ["zh", "en", "ja"]
    DEFAULT_LANGUAGE: str = "zh"

    @field_validator("AI_TEMPERATURE")
    @classmethod
    def validate_temperature(cls, v: float) -> float:
        if not 0.0 <= v <= 1.0:
            raise ValueError("AI_TEMPERATURE must be between 0.0 and 1.0")
        return v

    @field_validator("DATABASE_URL")
    @classmethod
    def validate_db_url(cls, v: str) -> str:
        if not v.startswith("postgresql+asyncpg://"):
            raise ValueError("DATABASE_URL must use postgresql+asyncpg:// scheme")
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True


@lru_cache
def get_settings() -> Settings:
    return Settings()