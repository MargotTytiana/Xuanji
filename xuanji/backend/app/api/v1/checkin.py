from fastapi import APIRouter, Header, HTTPException
from datetime import date

router = APIRouter()

_store: dict[str, str] = {}

@router.post("/")
async def checkin(x_user_id: str = Header(default="anonymous")):
    today = str(date.today())
    if _store.get(x_user_id) == today:
        raise HTTPException(status_code=400, detail="今日已签到")
    _store[x_user_id] = today
    return {"date": today, "message": "签到成功"}

@router.get("/status")
async def checkin_status(x_user_id: str = Header(default="anonymous")):
    today = str(date.today())
    return {"checked_in": _store.get(x_user_id) == today}