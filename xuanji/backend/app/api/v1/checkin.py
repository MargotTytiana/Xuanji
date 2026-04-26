from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from ...core.database import get_db
from ...core.security import get_current_user
from ...services.user_service import get_checkin_status, do_checkin

router = APIRouter()


@router.get("/status")
async def checkin_status(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await get_checkin_status(db, current_user.id)


@router.post("/")
async def checkin(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await do_checkin(db, current_user.id)
    if not result:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Already checked in today")
    return result