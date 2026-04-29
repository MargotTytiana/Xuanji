# 玄機 · Xuan Ji

> 融合古代易经八卦与现代人工智能，为您解读命运的密语，指引前行的方向。

![版本](https://img.shields.io/badge/版本-0.1.0-gold)
![前端](https://img.shields.io/badge/前端-Next.js_15-black)
![后端](https://img.shields.io/badge/后端-FastAPI-green)
![AI](https://img.shields.io/badge/AI-Claude_API-orange)
![数据库](https://img.shields.io/badge/数据库-PostgreSQL_16-blue)

---
[English Version](./README.en.md)
---

## 目录

- [项目简介](#项目简介)
- [功能特性](#功能特性)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [环境变量配置](#环境变量配置)
- [数据库初始化](#数据库初始化)
- [开发指南](#开发指南)
- [API 文档](#api-文档)
- [部署](#部署)
- [常见问题](#常见问题)

---

## 项目简介

**玄機（Xuan Ji）** 是一个高端 AI 占卜与命理分析平台，将三千年的易经八卦智慧与 Anthropic Claude AI 深度融合，提供以下核心服务：

- 🃏 **AI 塔罗解读** — 三牌阵智能解析，流式输出占卜结果
- ☯ **六十四卦占卜** — 易经卦象演算，动态解读变卦趋势
- 🌟 **流年运势** — 基于生辰的个性化年度/月度/日度运势
- 🧬 **八卦人格测试** — 类 MBTI 的命盘原型测试，对应八卦八大人格
- 📅 **每日签到** — 连续签到打卡，记录运势轨迹

网站采用黑白金三色调，搭配慢速旋转的八卦动画，营造神秘而高雅的东方美学氛围。

---

## 功能特性

| 功能 | 描述 |
|------|------|
| AI 流式输出 | 占卜结果以打字机效果逐字呈现，沉浸感强 |
| 多语言支持 | 中文 / English / 日本語 三语切换 |
| 明暗主题 | 深色/浅色模式一键切换，偏好持久化存储 |
| 每日签到 | 记录连续签到天数，本地持久化 |
| 一键分享 | 支持复制链接、微信、微博、X/Twitter |
| 八卦人格 | 四题测试匹配八卦原型，AI 生成专属人格描述 |
| 响应式设计 | 适配桌面与移动端 |

---

## 技术栈

### 前端
- **框架**：Next.js 15 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS + CSS Variables
- **状态管理**：Zustand + persist
- **国际化**：next-intl
- **字体**：Noto Serif SC / Cinzel / Cormorant Garamond（本地托管）

### 后端
- **框架**：FastAPI
- **语言**：Python 3.12
- **数据库 ORM**：SQLAlchemy 2.0（异步）
- **数据库**：PostgreSQL 16
- **缓存**：Redis 7
- **AI**：Anthropic Claude API（claude-opus-4-5）
- **认证**：JWT（python-jose + passlib）
- **迁移**：Alembic

### 基础设施
- **容器化**：Docker + Docker Compose
- **前端部署**：Vercel
- **后端部署**：Railway

---

## 项目结构

```
xuanji/
├── docker-compose.yml          # 容器编排
├── frontend/                   # Next.js 前端
│   ├── public/
│   │   └── fonts/              # 本地字体文件
│   └── src/
│       ├── app/                # 页面路由
│       │   ├── (home)/         # 首页
│       │   ├── tarot/          # 塔罗页
│       │   ├── bagua/          # 八卦页
│       │   ├── horoscope/      # 运势页
│       │   ├── profile/        # 人格测试页
│       │   └── api/            # Next.js API Routes（代理层）
│       ├── components/
│       │   ├── layout/         # Navbar / Footer / HeroSection
│       │   ├── ui/             # 基础 UI 组件
│       │   └── divination/     # 占卜相关组件
│       ├── hooks/              # useTheme / useCheckin / useDivination
│       ├── store/              # Zustand 状态管理
│       ├── lib/                # API 封装 / 工具函数 / 常量
│       ├── types/              # TypeScript 类型定义
│       └── i18n/               # 多语言 JSON
│
└── backend/                    # FastAPI 后端
    └── app/
        ├── api/v1/             # 路由层
        │   ├── divination.py   # 占卜（流式 + 人格）
        │   ├── tarot.py        # 塔罗抽牌
        │   ├── bagua.py        # 八卦起卦
        │   ├── user.py         # 用户注册/登录
        │   └── checkin.py      # 每日签到
        ├── core/               # 配置 / 数据库 / 安全
        ├── models/             # SQLAlchemy 数据模型
        ├── services/           # 业务逻辑层
        │   ├── ai_service.py   # Claude API 封装
        │   ├── tarot_service.py
        │   ├── bagua_service.py
        │   └── user_service.py
        ├── prompts/            # AI 提示词模板（中/英/日）
        └── main.py             # FastAPI 入口
```

---

## 快速开始

### 前置要求

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) 已安装并运行
- [Git](https://git-scm.com/)
- Anthropic API Key（[获取地址](https://console.anthropic.com)）

### 1. 克隆项目

```bash
git clone https://github.com/MargotTytiana/Xuanji.git
cd xuanji
```

### 2. 配置环境变量

复制并填写后端环境变量：

```bash
# backend/.env
ANTHROPIC_API_KEY=sk-ant-你的密钥
SECRET_KEY=任意随机字符串（建议32位以上）
DATABASE_URL=postgresql+asyncpg://user:pass@postgres:5432/xuanji
REDIS_URL=redis://redis:6379/0
DEBUG=True
ALLOWED_ORIGINS=["http://localhost:3000"]
```

复制并填写前端环境变量：

```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. 启动服务

```bash
docker compose up --build
```

### 4. 初始化数据库

首次启动需建表，执行：

```bash
docker exec -it xuanji-backend-1 python3 -c "
import asyncio, os
from app.core.database import engine, Base
from app.models.user import User
from app.models.reading import Reading
from app.models.checkin import Checkin
async def create():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print('✓ 数据库表创建成功')
asyncio.run(create())
"
```

### 5. 访问服务

| 服务 | 地址 |
|------|------|
| 前端 | http://localhost:3000 |
| 后端 API 文档 | http://localhost:8000/docs |
| 健康检查 | http://localhost:8000/health |

---

## 环境变量配置

### backend/.env

| 变量 | 必填 | 说明 |
|------|------|------|
| `ANTHROPIC_API_KEY` | ✅ | Claude API 密钥 |
| `SECRET_KEY` | ✅ | JWT 签名密钥，生产环境请使用随机长字符串 |
| `DATABASE_URL` | ✅ | PostgreSQL 连接串，格式：`postgresql+asyncpg://用户:密码@主机:端口/数据库` |
| `REDIS_URL` | ✅ | Redis 连接串 |
| `DEBUG` | ❌ | 开发模式，生产环境设为 `False` |
| `ALLOWED_ORIGINS` | ❌ | CORS 允许的前端域名，JSON 数组格式 |
| `AI_MODEL` | ❌ | 默认 `claude-opus-4-5` |
| `AI_MAX_TOKENS` | ❌ | 默认 `1024` |

### frontend/.env.local

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_API_URL` | 后端 API 地址，生产环境替换为实际域名 |

---

## 数据库初始化

项目使用 SQLAlchemy 异步引擎，支持两种方式初始化数据库：

**方式一：Python 脚本（推荐）**

```bash
docker exec -it xuanji-backend-1 python3 -c "
import asyncio
from app.core.database import engine, Base
from app.models.user import User
from app.models.reading import Reading
from app.models.checkin import Checkin
asyncio.run((lambda: [asyncio.get_event_loop().run_until_complete(
    engine.begin().__aenter__().__await__()
)])())
"
```

**方式二：Alembic 迁移**

```bash
docker exec -it xuanji-backend-1 bash
pip install psycopg2-binary
sed -i 's|sqlalchemy.url.*|sqlalchemy.url = postgresql://user:pass@postgres:5432/xuanji|' /app/alembic.ini
alembic revision --autogenerate -m "init"
alembic upgrade head
```

---

## 开发指南

### 代码热更新

加入 volume 挂载后，修改代码无需重启容器：

- **后端**：保存 `.py` 文件后，uvicorn `--reload` 自动重载
- **前端**：保存 `.tsx/.css` 文件后，Next.js HMR 自动刷新

### 添加新的 AI 提示词

在 `backend/app/prompts/` 目录添加 `{类型}_{语言}.txt` 文件，命名规则：

```
tarot_zh.txt       # 塔罗中文提示词
tarot_en.txt       # 塔罗英文提示词
bagua_zh.txt       # 八卦中文提示词
personality_zh.txt # 人格测试提示词
```

### 添加新页面

在 `frontend/src/app/` 下新建目录和 `page.tsx`，路由自动注册：

```
src/app/ziwei/page.tsx  →  http://localhost:3000/ziwei
```

---

## API 文档

启动后访问 `http://localhost:8000/docs` 查看完整 Swagger 文档。

### 核心接口

#### 占卜流式输出
```
POST /api/v1/divination/stream
Content-Type: application/json

{
  "type": "tarot",        // tarot | bagua | personality
  "question": "我的感情运势如何？",
  "context": { "cards": ["愚者", "星星"] },
  "language": "zh"        // zh | en | ja
}
```

#### 八卦人格测试
```
POST /api/v1/divination/personality
Content-Type: application/json

{
  "answers": ["直接冲上去", "自然成为焦点", "成就与荣耀", "强势纠正回轨"],
  "language": "zh"
}
```

#### 每日签到
```
POST /api/v1/checkin/
x-user-id: {用户ID}
```

---

## 部署

### 前端部署（Vercel）

1. 将项目推送至 GitHub
2. 在 [Vercel](https://vercel.com) 导入仓库
3. 设置根目录为 `frontend`
4. 添加环境变量 `NEXT_PUBLIC_API_URL=https://你的后端域名`
5. 点击部署

### 后端部署（Railway）

1. 在 [Railway](https://railway.app) 新建项目
2. 添加 PostgreSQL 和 Redis 插件
3. 连接 GitHub 仓库，根目录设为 `backend`
4. 配置所有环境变量
5. 部署完成后获取域名，更新前端的 `NEXT_PUBLIC_API_URL`

---

## 常见问题

**Q: 前端页面空白？**
A: 检查 `layout.tsx` 是否还有 `next/font/google` 导入，删除后重启。

**Q: 后端启动报 `ValidationError`？**
A: `backend/.env` 文件未配置或路径错误，确认文件存在且包含所有必填变量。

**Q: 数据库连接失败？**
A: Docker 内部服务用容器名通信，`DATABASE_URL` 中主机应为 `postgres`，不是 `localhost`。

**Q: AI 占卜返回错误？**
A: 检查 `ANTHROPIC_API_KEY` 是否有效，可在 [console.anthropic.com](https://console.anthropic.com) 验证。

**Q: 字体不显示？**
A: 确认字体文件已放入 `frontend/public/fonts/`，文件名与 `globals.css` 中的 `url()` 路径完全一致。

---

## License

MIT License © 2025 玄機 · Xuan Ji