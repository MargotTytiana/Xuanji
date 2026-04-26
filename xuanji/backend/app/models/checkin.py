from datetime import datetime, date
from sqlalchemy import String, Boolean, Integer, Date, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.database import Base


# ── Checkin ───────────────────────────────────────────────────
class Checkin(Base):
    __tablename__ = "checkins"

    id:      Mapped[int]  = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int]  = mapped_column(ForeignKey("users.id"), nullable=False)
    date:    Mapped[date] = mapped_column(Date, nullable=False)
    streak:  Mapped[int]  = mapped_column(Integer, default=1)

    user: Mapped["User"] = relationship(back_populates="checkins")