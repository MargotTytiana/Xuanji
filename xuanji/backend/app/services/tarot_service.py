import random
from dataclasses import dataclass

@dataclass
class TarotCard:
    id:       int
    zh:       str
    en:       str
    reversed: bool = False


MAJOR_ARCANA = [
    TarotCard(0,  "愚者",   "The Fool"),
    TarotCard(1,  "魔术师", "The Magician"),
    TarotCard(2,  "女祭司", "The High Priestess"),
    TarotCard(3,  "皇后",   "The Empress"),
    TarotCard(4,  "皇帝",   "The Emperor"),
    TarotCard(5,  "教皇",   "The Hierophant"),
    TarotCard(6,  "恋人",   "The Lovers"),
    TarotCard(7,  "战车",   "The Chariot"),
    TarotCard(8,  "力量",   "Strength"),
    TarotCard(9,  "隐士",   "The Hermit"),
    TarotCard(10, "命运之轮", "Wheel of Fortune"),
    TarotCard(11, "正义",   "Justice"),
    TarotCard(12, "倒吊人", "The Hanged Man"),
    TarotCard(13, "死神",   "Death"),
    TarotCard(14, "节制",   "Temperance"),
    TarotCard(15, "恶魔",   "The Devil"),
    TarotCard(16, "塔",     "The Tower"),
    TarotCard(17, "星星",   "The Star"),
    TarotCard(18, "月亮",   "The Moon"),
    TarotCard(19, "太阳",   "The Sun"),
    TarotCard(20, "审判",   "Judgement"),
    TarotCard(21, "世界",   "The World"),
]


def draw(count: int = 3, reversed_probability: float = 0.3) -> list[TarotCard]:
    drawn = random.sample(MAJOR_ARCANA, min(count, len(MAJOR_ARCANA)))
    return [
        TarotCard(c.id, c.zh, c.en, reversed=random.random() < reversed_probability)
        for c in drawn
    ]


def cards_as_dict(cards: list[TarotCard]) -> list[dict]:
    return [{"id": c.id, "zh": c.zh, "en": c.en, "reversed": c.reversed} for c in cards]


def get_all() -> list[dict]:
    return [{"id": c.id, "zh": c.zh, "en": c.en} for c in MAJOR_ARCANA]