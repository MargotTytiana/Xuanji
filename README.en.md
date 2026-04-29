# 玄機 · Xuan Ji

> Where ancient I-Ching wisdom meets modern AI — decoding the language of fate, guiding your path forward.

![Version](https://img.shields.io/badge/version-0.1.0-gold)
![Frontend](https://img.shields.io/badge/frontend-Next.js_15-black)
![Backend](https://img.shields.io/badge/backend-FastAPI-green)
![AI](https://img.shields.io/badge/AI-Claude_API-orange)
![Database](https://img.shields.io/badge/database-PostgreSQL_16-blue)

---
[中文版本](./README.md)
---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Development Guide](#development-guide)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [FAQ](#faq)

---

## Overview

**Xuan Ji (玄機)** is a high-end AI divination and destiny analysis platform that fuses three millennia of I-Ching and Ba Gua wisdom with Anthropic's Claude AI, delivering:

- 🃏 **AI Tarot Reading** — Three-card spread with intelligent, streaming interpretation
- ☯ **64 Hexagram Oracle** — I-Ching casting with dynamic changing-line analysis
- 🌟 **Annual Fortune** — Personalised yearly / monthly / daily readings based on birth date
- 🧬 **Bagua Archetype Test** — An MBTI-style personality test mapping to eight cosmic archetypes
- 📅 **Daily Check-in** — Streak tracking with fortune unlocks

The interface uses a monochromatic black-white-gold palette with a slowly rotating Bagua animation, evoking a refined Eastern aesthetic.

---

## Features

| Feature | Description |
|---------|-------------|
| AI Streaming | Results appear character by character for a mystical, immersive feel |
| Multilingual | Chinese / English / Japanese with one-click switching |
| Theme Toggle | Dark / light mode with persistent user preference |
| Daily Check-in | Consecutive streak counter stored locally |
| Share Panel | Copy link, WeChat, Weibo, X/Twitter |
| Archetype Test | Four-question quiz → AI-generated Bagua personality profile |
| Responsive | Fully optimised for desktop and mobile |

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **State**: Zustand + persist middleware
- **i18n**: next-intl
- **Fonts**: Noto Serif SC / Cinzel / Cormorant Garamond (self-hosted)

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.12
- **ORM**: SQLAlchemy 2.0 (async)
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **AI**: Anthropic Claude API (claude-opus-4-5)
- **Auth**: JWT via python-jose + passlib
- **Migrations**: Alembic

### Infrastructure
- **Containerisation**: Docker + Docker Compose
- **Frontend Deploy**: Vercel
- **Backend Deploy**: Railway

---

## Project Structure

```
xuanji/
├── docker-compose.yml
├── frontend/
│   ├── public/fonts/               # Self-hosted font files
│   └── src/
│       ├── app/                    # App Router pages
│       │   ├── (home)/             # Landing page
│       │   ├── tarot/              # Tarot reading
│       │   ├── bagua/              # I-Ching oracle
│       │   ├── horoscope/          # Fortune reading
│       │   ├── profile/            # Archetype test
│       │   └── api/                # Proxy routes to backend
│       ├── components/
│       │   ├── layout/             # Navbar / Footer / HeroSection
│       │   ├── ui/                 # Base UI components
│       │   └── divination/         # Divination-specific components
│       ├── hooks/                  # useTheme / useCheckin / useDivination
│       ├── store/                  # Zustand stores
│       ├── lib/                    # API client / utilities / constants
│       ├── types/                  # Shared TypeScript types
│       └── i18n/                   # zh.json / en.json / ja.json
│
└── backend/
    └── app/
        ├── api/v1/                 # Route handlers
        ├── core/                   # Config / database / security
        ├── models/                 # SQLAlchemy models
        ├── services/               # Business logic + AI service
        ├── prompts/                # AI prompt templates (zh/en/ja)
        └── main.py                 # FastAPI entry point
```

---

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- An Anthropic API key ([get one here](https://console.anthropic.com))

### 1. Clone the repository

```bash
git clone https://github.com/MargotTytiana/Xuanji.git
cd xuanji
```

### 2. Configure environment variables

Create `backend/.env`:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
SECRET_KEY=your-random-secret-key
DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/xuanji
REDIS_URL=redis://redis:6379/0
DEBUG=True
ALLOWED_ORIGINS=["http://localhost:3000"]
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start all services

```bash
docker compose up --build
```

### 4. Initialise the database

Run once on first start:

```bash
docker exec -it xuanji-backend-1 python3 -c "
import asyncio
from app.core.database import engine, Base
from app.models.user import User
from app.models.reading import Reading
from app.models.checkin import Checkin
async def create():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print('✓ Tables created')
asyncio.run(create())
"
```

### 5. Open in browser

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| API Docs | http://localhost:8000/docs |
| Health Check | http://localhost:8000/health |

---

## Environment Variables

### backend/.env

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | ✅ | Claude API key |
| `SECRET_KEY` | ✅ | JWT signing secret — use a long random string in production |
| `DATABASE_URL` | ✅ | PostgreSQL DSN with `asyncpg` driver |
| `REDIS_URL` | ✅ | Redis connection string |
| `DEBUG` | ❌ | Set to `False` in production |
| `ALLOWED_ORIGINS` | ❌ | JSON array of allowed CORS origins |
| `AI_MODEL` | ❌ | Defaults to `claude-opus-4-5` |
| `AI_MAX_TOKENS` | ❌ | Defaults to `1024` |

### frontend/.env.local

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

---

## Database Setup

**Option A — Python script (recommended)**

```bash
docker exec -it xuanji-backend-1 python3 -c "
import asyncio
from app.core.database import engine, Base
from app.models.user import User
from app.models.reading import Reading
from app.models.checkin import Checkin
async def create():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
asyncio.run(create())
"
```

**Option B — Alembic migrations**

```bash
docker exec -it xuanji-backend-1 bash
pip install psycopg2-binary
sed -i 's|sqlalchemy.url.*|sqlalchemy.url = postgresql://user:pass@postgres:5432/xuanji|' /app/alembic.ini
alembic revision --autogenerate -m "init"
alembic upgrade head
```

---

## Development Guide

### Hot Reload

With volume mounts configured in `docker-compose.yml`:
- **Backend**: uvicorn `--reload` picks up changes to any `.py` file automatically
- **Frontend**: Next.js HMR refreshes the browser on every `.tsx` / `.css` save

### Adding AI Prompts

Drop a new file into `backend/app/prompts/` following the naming convention:

```
{type}_{language}.txt
# e.g. tarot_en.txt, bagua_ja.txt, personality_zh.txt
```

### Adding a New Page

Create a directory under `frontend/src/app/` — the route is registered automatically:

```
src/app/ziwei/page.tsx  →  http://localhost:3000/ziwei
```

---

## API Reference

Full interactive docs at `http://localhost:8000/docs`.

### Stream a divination reading

```http
POST /api/v1/divination/stream
Content-Type: application/json

{
  "type": "tarot",
  "question": "What does my love life hold?",
  "context": { "cards": ["The Fool", "The Star"] },
  "language": "en"
}
```

### Get a personality archetype

```http
POST /api/v1/divination/personality
Content-Type: application/json

{
  "answers": ["Charge in directly", "Natural centre of attention", "Achievement", "Correct it forcefully"],
  "language": "en"
}
```

### Daily check-in

```http
POST /api/v1/checkin/
x-user-id: {user-id}
```

---

## Deployment

### Frontend → Vercel

1. Push the repository to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Set the root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-backend-domain`
5. Deploy

### Backend → Railway

1. Create a new project at [railway.app](https://railway.app)
2. Add PostgreSQL and Redis plugins
3. Connect the GitHub repo, set root directory to `backend`
4. Configure all environment variables
5. Copy the generated domain and update `NEXT_PUBLIC_API_URL` on Vercel

---

## FAQ

**Frontend shows a blank page?**
Check `layout.tsx` for any remaining `next/font/google` imports and remove them.

**Backend crashes with `ValidationError`?**
`backend/.env` is missing or incomplete. Ensure all required variables are present.

**Database connection refused?**
Inside Docker, services communicate by container name. Use `postgres` (not `localhost`) in `DATABASE_URL`.

**AI divination returns an error?**
Verify your `ANTHROPIC_API_KEY` at [console.anthropic.com](https://console.anthropic.com).

**Fonts not rendering?**
Confirm font files are in `frontend/public/fonts/` and filenames exactly match the `url()` paths in `globals.css`.

---

## License

MIT License © 2025 玄機 · Xuan Ji