from datetime import datetime, date
from sqlalchemy import String, Boolean, Integer, Date, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.database import Base

 
# ── Reading ───────────────────────────────────────────────────
class Reading(Base):
    __tablename__ = "readings"
 
    id:         Mapped[int]      = mapped_column(Integer, primary_key=True)
    user_id:    Mapped[int]      = mapped_column(ForeignKey("users.id"), nullable=False)
    type:       Mapped[str]      = mapped_column(String(32))   # tarot | bagua | personality
    question:   Mapped[str]      = mapped_column(Text)
    context:    Mapped[str]      = mapped_column(Text, default="{}")   # JSON string
    result:     Mapped[str]      = mapped_column(Text)
    language:   Mapped[str]      = mapped_column(String(8), default="zh")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
 
    user: Mapped["User"] = relationship(back_populates="readings")
 