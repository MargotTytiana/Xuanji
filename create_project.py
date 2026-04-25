import os

structure = {
    "xuanji/": {
        # ── Frontend (Next.js)
        "frontend/": {
            "public/": {"fonts/": {}, "images/": {}, "icons/": {}},
            "src/": {
                "app/": {
                    "(home)/": {"page.tsx": "", "layout.tsx": ""},
                    "tarot/": {"page.tsx": "", "reading/[id]/": {"page.tsx": ""}},
                    "bagua/": {"page.tsx": "", "result/[type]/": {"page.tsx": ""}},
                    "horoscope/": {"page.tsx": ""},
                    "profile/": {"page.tsx": ""},
                    "api/": {"divination/route.ts": "", "checkin/route.ts": ""},
                    "layout.tsx": "",
                    "globals.css": "",
                },
                "components/": {
                    "ui/": {
                        "BaguaWheel.tsx": "",
                        "TarotCard.tsx": "",
                        "CharacterCard.tsx": "",
                        "ThemeToggle.tsx": "",
                        "LangSwitcher.tsx": "",
                        "SharePanel.tsx": "",
                        "CheckinButton.tsx": "",
                        "Toast.tsx": "",
                    },
                    "layout/": {
                        "Navbar.tsx": "",
                        "Footer.tsx": "",
                        "HeroSection.tsx": "",
                    },
                    "divination/": {
                        "CardSpread.tsx": "",
                        "ResultDisplay.tsx": "",
                        "PersonalityResult.tsx": "",
                    },
                },
                "lib/": {
                    "api.ts": "",
                    "i18n.ts": "",
                    "utils.ts": "",
                    "constants.ts": "",
                },
                "hooks/": {
                    "useTheme.ts": "",
                    "useCheckin.ts": "",
                    "useDivination.ts": "",
                },
                "store/": {"userStore.ts": "", "divinationStore.ts": ""},
                "types/": {"index.ts": ""},
                "i18n/": {"zh.json": "", "en.json": "", "ja.json": ""},
            },
            "package.json": "",
            "tailwind.config.ts": "",
            "tsconfig.json": "",
            "next.config.ts": "",
            ".env.local": "",
        },

        # ── Backend (FastAPI)
        "backend/": {
            "app/": {
                "api/": {
                    "v1/": {
                        "divination.py": "",
                        "tarot.py": "",
                        "bagua.py": "",
                        "user.py": "",
                        "checkin.py": "",
                    },
                    "__init__.py": "",
                },
                "core/": {
                    "config.py": "",
                    "security.py": "",
                    "database.py": "",
                },
                "models/": {
                    "user.py": "",
                    "reading.py": "",
                    "checkin.py": "",
                },
                "services/": {
                    "ai_service.py": "",      # Claude / OpenAI API
                    "tarot_service.py": "",
                    "bagua_service.py": "",
                    "user_service.py": "",
                },
                "prompts/": {
                    "tarot_zh.txt": "",
                    "tarot_en.txt": "",
                    "bagua_zh.txt": "",
                    "personality_zh.txt": "",
                },
                "main.py": "",
                "__init__.py": "",
            },
            "requirements.txt": "",
            ".env": "",
            "Dockerfile": "",
        },

        # ── Shared / DevOps
        "docker-compose.yml": "",
        "README.md": "",
        ".gitignore": "",
    }
}

def create(base, tree):
    for name, content in tree.items():
        path = os.path.join(base, name)
        if name.endswith("/"):
            os.makedirs(path, exist_ok=True)
            if isinstance(content, dict):
                create(path, content)
        else:
            os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
            if not os.path.exists(path):
                with open(path, "w", encoding="utf-8") as f:
                    f.write(content)

if __name__ == "__main__":
    create(".", structure)
    print("✦ 玄機项目结构已创建完成")
    print("   cd xuanji/frontend  →  npm install && npm run dev")
    print("   cd xuanji/backend   →  pip install -r requirements.txt && uvicorn app.main:app")