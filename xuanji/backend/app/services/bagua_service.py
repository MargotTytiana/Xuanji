import random
from dataclasses import dataclass


@dataclass
class Hexagram:
    number: int
    zh:     str
    en:     str
    upper:  str   # upper trigram
    lower:  str   # lower trigram


TRIGRAMS = {
    "乾": "Heaven",
    "坤": "Earth",
    "震": "Thunder",
    "巽": "Wind",
    "坎": "Water",
    "离": "Fire",
    "艮": "Mountain",
    "兑": "Lake",
}

# Subset of 64 hexagrams (upper × lower combinations)
HEXAGRAMS: list[Hexagram] = [
    Hexagram(1,  "乾为天",   "Force",          "乾", "乾"),
    Hexagram(2,  "坤为地",   "Field",          "坤", "坤"),
    Hexagram(3,  "水雷屯",   "Sprouting",      "坎", "震"),
    Hexagram(4,  "山水蒙",   "Enveloping",     "艮", "坎"),
    Hexagram(5,  "水天需",   "Attending",      "坎", "乾"),
    Hexagram(6,  "天水讼",   "Arguing",        "乾", "坎"),
    Hexagram(7,  "地水师",   "Leading",        "坤", "坎"),
    Hexagram(8,  "水地比",   "Grouping",       "坎", "坤"),
    Hexagram(11, "地天泰",   "Pervading",      "坤", "乾"),
    Hexagram(12, "天地否",   "Obstruction",    "乾", "坤"),
    Hexagram(29, "坎为水",   "Gorge",          "坎", "坎"),
    Hexagram(30, "离为火",   "Radiance",       "离", "离"),
    Hexagram(51, "震为雷",   "Shake",          "震", "震"),
    Hexagram(52, "艮为山",   "Bound",          "艮", "艮"),
    Hexagram(57, "巽为风",   "Ground",         "巽", "巽"),
    Hexagram(58, "兑为泽",   "Open",           "兑", "兑"),
    Hexagram(63, "水火既济", "Already Fording","坎", "离"),
    Hexagram(64, "火水未济", "Not Yet Fording","离", "坎"),
]


def cast() -> Hexagram:
    return random.choice(HEXAGRAMS)


def cast_by_trigrams(upper: str, lower: str) -> Hexagram | None:
    return next((h for h in HEXAGRAMS if h.upper == upper and h.lower == lower), None)


def get_all() -> list[dict]:
    return [{"number": h.number, "zh": h.zh, "en": h.en, "upper": h.upper, "lower": h.lower}
            for h in HEXAGRAMS]


def hexagram_as_dict(h: Hexagram) -> dict:
    return {"number": h.number, "zh": h.zh, "en": h.en, "upper": h.upper, "lower": h.lower}