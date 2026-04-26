from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from ...services.ai_service import DivinationType, stream_reading, get_personality_type

router = APIRouter()


class ReadingRequest(BaseModel):
    type: DivinationType
    question: str
    context: dict = {}
    language: str = "zh"


class PersonalityRequest(BaseModel):
    answers: list[str]
    language: str = "zh"


@router.post("/stream")
async def stream_divination(body: ReadingRequest):
    async def generator():
        async for chunk in stream_reading(body.type, body.question, body.context, body.language):
            yield chunk

    return StreamingResponse(generator(), media_type="text/plain; charset=utf-8")


@router.post("/personality")
async def personality(body: PersonalityRequest):
    try:
        return await get_personality_type(body.answers, body.language)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))