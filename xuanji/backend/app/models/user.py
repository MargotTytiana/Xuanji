from datetime import datetime, date
from sqlalchemy import String, Boolean, Integer, Date, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.database import Base
 
 
# ── User ─────────────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"
 
    id:         Mapped[int]      = mapped_column(Integer, primary_key=True)
    username:   Mapped[str]      = mapped_column(String(64), unique=True, nullable=False)
    email:      Mapped[str]      = mapped_column(String(256), unique=True, nullable=False)
    hashed_pw:  Mapped[str]      = mapped_column(String(256), nullable=False)
    language:   Mapped[str]      = mapped_column(String(8), default="zh")
    is_active:  Mapped[bool]     = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
 
    readings: Mapped[list["Reading"]] = relationship(back_populates="user")
    checkins: Mapped[list["Checkin"]] = relationship(back_populates="user")