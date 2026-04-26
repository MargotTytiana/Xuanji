from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status
from ..models.user import User
from ..core.security import hash_password, verify_password, create_token


async def get_by_username(db: AsyncSession, username: str) -> User | None:
    result = await db.execute(select(User).where(User.username == username))
    return result.scalar_one_or_none()


async def get_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def register(db: AsyncSession, username: str, email: str, password: str) -> User:
    if await get_by_username(db, username):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="用户名已存在")
    if await get_by_email(db, email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="邮箱已注册")

    user = User(username=username, email=email, hashed_pw=hash_password(password))
    db.add(user)
    await db.flush()   # get user.id without committing
    return user


async def login(db: AsyncSession, username: str, password: str) -> dict:
    user = await get_by_username(db, username)
    if not user or not verify_password(password, user.hashed_pw):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="用户名或密码错误")
    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="账户已停用")

    token = create_token({"sub": str(user.id), "username": user.username})
    return {"access_token": token, "token_type": "bearer"}


async def update_language(db: AsyncSession, user_id: int, language: str) -> User:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="用户不存在")
    user.language = language
    return user