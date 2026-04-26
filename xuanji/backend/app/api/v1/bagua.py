from fastapi import APIRouter
import random

router = APIRouter()

HEXAGRAMS = [
    {"zh": "乾", "en": "Heaven",   "lines": [True,  True,  True]},
    {"zh": "坤", "en": "Earth",    "lines": [False, False, False]},
    {"zh": "坎", "en": "Water",    "lines": [False, True,  False]},
    {"zh": "离", "en": "Fire",     "lines": [True,  False, True]},
    {"zh": "震", "en": "Thunder",  "lines": [False, False, True]},
    {"zh": "巽", "en": "Wind",     "lines": [True,  False, False]},
    {"zh": "艮", "en": "Mountain", "lines": [True,  False, False]},
    {"zh": "兑", "en": "Lake",     "lines": [False, True,  True]},
]


@router.get("/hexagrams")
async def list_hexagrams():
    return HEXAGRAMS


@router.get("/cast")
async def cast_hexagram():
    """Randomly cast a hexagram for the daily reading."""
    return random.choice(HEXAGRAMS)