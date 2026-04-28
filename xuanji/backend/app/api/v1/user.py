from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from ...core.database import get_db
from ...services.user_service import register, login

router = APIRouter()

class RegisterRequest(BaseModel):
    username: str
    email:    str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_route(req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    user = await register(db, req.username, req.email, req.password)
    return {"message": "注册成功", "id": user.id, "username": user.username}

@router.post("/login")
async def login_route(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await login(db, req.username, req.password)