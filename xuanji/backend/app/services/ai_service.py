import anthropic
from pathlib import Path
from enum import StrEnum
from ..core.config import get_settings

settings = get_settings()
client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

PROMPTS_DIR = Path(__file__).parent.parent / "prompts"


class DivinationType(StrEnum):
    TAROT = "tarot"
    BAGUA = "bagua"
    PERSONALITY = "personality"


def _load_prompt(divination_type: DivinationType, language: str) -> str:
    path = PROMPTS_DIR / f"{divination_type}_{language}.txt"
    fallback = PROMPTS_DIR / f"{divination_type}_zh.txt"
    target = path if path.exists() else fallback
    return target.read_text(encoding="utf-8")


def _build_system_prompt(divination_type: DivinationType, language: str) -> str:
    base = _load_prompt(divination_type, language)
    tone = (
        "You are a mystical AI oracle. Respond with poetic, atmospheric prose. "
        "Never break character. Keep answers between 150-300 words."
    )
    return f"{tone}\n\n{base}"


async def stream_reading(
    divination_type: DivinationType,
    user_question: str,
    context: dict,        # e.g. {"cards": [...]} or {"hexagram": "坎"}
    language: str = "zh",
):
    """Yield text chunks from Claude as an async generator."""
    system = _build_system_prompt(divination_type, language)
    user_msg = (
        f"Question: {user_question}\n"
        f"Context: {context}\n"
        f"Language: {language}"
    )

    async with client.messages.stream(
        model=settings.AI_MODEL,
        max_tokens=settings.AI_MAX_TOKENS,
        temperature=settings.AI_TEMPERATURE,
        system=system,
        messages=[{"role": "user", "content": user_msg}],
    ) as stream:
        async for text in stream.text_stream:
            yield text


async def get_reading(
    divination_type: DivinationType,
    user_question: str,
    context: dict,
    language: str = "zh",
) -> str:
    """Return the full reading as a single string (non-streaming)."""
    chunks = []
    async for chunk in stream_reading(divination_type, user_question, context, language):
        chunks.append(chunk)
    return "".join(chunks)


async def get_personality_type(answers: list[str], language: str = "zh") -> dict:
    """Analyse quiz answers and return a bagua personality archetype."""
    system = _build_system_prompt(DivinationType.PERSONALITY, language)
    user_msg = (
        "Based on these quiz answers, identify the user's bagua archetype. "
        "Respond ONLY in JSON: "
        '{"type": "乾|坤|坎|离|震|巽|艮|兑", "title": "...", "description": "...", "traits": [...]}\n\n'
        f"Answers: {answers}"
    )

    response = await client.messages.create(
        model=settings.AI_MODEL,
        max_tokens=512,
        system=system,
        messages=[{"role": "user", "content": user_msg}],
    )

    import json
    raw = response.content[0].text.strip()
    return json.loads(raw)