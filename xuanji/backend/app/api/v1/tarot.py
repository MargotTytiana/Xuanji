from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

CARDS = [
    {"id": 0,  "zh": "愚者",   "en": "The Fool"},
    {"id": 1,  "zh": "魔术师", "en": "The Magician"},
    {"id": 2,  "zh": "女祭司", "en": "The High Priestess"},
    {"id": 3,  "zh": "女皇",   "en": "The Empress"},
    {"id": 4,  "zh": "皇帝",   "en": "The Emperor"},
    {"id": 5,  "zh": "教皇",   "en": "The Hierophant"},
    {"id": 6,  "zh": "恋人",   "en": "The Lovers"},
    {"id": 7,  "zh": "战车",   "en": "The Chariot"},
    {"id": 8,  "zh": "力量",   "en": "Strength"},
    {"id": 9,  "zh": "隐者",   "en": "The Hermit"},
    {"id": 10, "zh": "命运之轮","en": "Wheel of Fortune"},
    {"id": 11, "zh": "正义",   "en": "Justice"},
    {"id": 12, "zh": "倒吊人", "en": "The Hanged Man"},
    {"id": 13, "zh": "死神",   "en": "Death"},
    {"id": 14, "zh": "节制",   "en": "Temperance"},
    {"id": 15, "zh": "恶魔",   "en": "The Devil"},
    {"id": 16, "zh": "塔",     "en": "The Tower"},
    {"id": 17, "zh": "星星",   "en": "The Star"},
    {"id": 18, "zh": "月亮",   "en": "The Moon"},
    {"id": 19, "zh": "太阳",   "en": "The Sun"},
    {"id": 20, "zh": "审判",   "en": "Judgement"},
    {"id": 21, "zh": "世界",   "en": "The World"},
]


class DrawRequest(BaseModel):
    count: int = 3  # number of cards to draw


@router.get("/cards")
async def list_cards():
    return CARDS


@router.post("/draw")
async def draw_cards(body: DrawRequest):
    count = max(1, min(body.count, len(CARDS)))
    drawn = random.sample(CARDS, count)
    # randomly assign upright / reversed
    return [
        {**card, "reversed": random.choice([True, False])}
        for card in drawn
    ]